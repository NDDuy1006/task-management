import React, {useCallback, useEffect, useState} from "react";
import { TaskType, TaskStatus } from "../types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from "@hello-pangea/dnd"
import KanbanTaskCard from "./KanbanTaskCard"
import { KanbanLaneHeader } from "./KanbanLaneHeader";

interface DataKanbanProps {
  data: TaskType[];
  onChange: (tasks: { $id: string; status: TaskStatus; position: number }[]) => void
}

const lanes: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
]

type TasksState = {
  [key in TaskStatus]: TaskType[]
}

export const DataKanban = ({
  data,
  onChange
}: DataKanbanProps) => {
  // Insert initial tasks into each lane of their corresponding status
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.NULL]: []
    }

    data.forEach((task) => {
      initialTasks[task.status].push(task)
    })

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
    })

    return initialTasks
  })

  // refresh the received data(task) after every action 
  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.NULL]: []
    }

    data.forEach((task) => {
      newTasks[task.status].push(task)
    })

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
    })

    setTasks(newTasks)
  }, [data])

  const onDragEnd = useCallback((result: DropResult) => {
    // Destination can't be null
    if (!result.destination) return

    const { source, destination } = result
    const sourceStatus = source.droppableId as TaskStatus
    const destStatus = destination.droppableId as TaskStatus

    // Grab all tasks that will be updated when a single task has been dragged 
    let updatePayload: { $id: string; status: TaskStatus; position: number }[] = []

    setTasks((prevTasks) => {
      // Shallow copy of the current tasks (all tasks)
      const newTasks = { ...prevTasks }

      // create a shallow copy of task list at the source column
      const sourceColumn = [...newTasks[sourceStatus]]
      // safely remove the task from the source column
      const [movedTask] = sourceColumn.splice(source.index, 1)

      // Create a new task object with potentially updated status
      const updatedMovedTask = sourceStatus !== destStatus
        ? { ...movedTask, status: destStatus }
        : movedTask
      
      // Update the source column
      newTasks[sourceStatus] = sourceColumn

      // Insert the task to the destination column
      const destColumn = [...newTasks[destStatus]]
      destColumn.splice(destination.index, 0, updatedMovedTask)
      newTasks[destStatus] = destColumn

      // Prepare minimum update payloads (all tasks that have been updated)
      updatePayload = []

      // Always update the moved task
      updatePayload.push({
        $id: updatedMovedTask.$id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000)
      })

      // Update positions for affected tasks in the destination column according to their indices
      newTasks[destStatus].forEach((task, index) => {
        if (task && task.$id !== updatedMovedTask.$id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000)
          if (task.position !== newPosition) {
            updatePayload.push({
              $id: task.$id,
              status: destStatus,
              position: newPosition
            })
          }
        }
      })

      // Update the positions of the source column according to their indices
      if (sourceStatus !== destStatus) {
        newTasks[sourceStatus].forEach((task, index) => {
          if (task) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000)
            if (task.position !== newPosition) {
              updatePayload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPosition
              })
            }
          }
        })
      }

      return newTasks
    })
    
    onChange(updatePayload)
  }, [onChange])

  return (
    // Drag and drop wrapper
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-auto">
        {lanes.map((lane) => {
          return (
            <div key={lane} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
              {/* lane header */}
              <KanbanLaneHeader
                lane={lane}
                taskCount={tasks[lane].length}
              />
              {/* lane drag and drop area */}
              <Droppable droppableId={lane}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {/* draggable items */}
                    {tasks[lane].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanTaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {/* reserve the space of the element that is being dragged */}
                    {/* {provided.placeholder} */}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
