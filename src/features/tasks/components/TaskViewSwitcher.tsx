"use client"

import { DottedSeparator } from "@/components/DottedSeparator"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
 } from "@/components/ui/tabs"
import { Loader, PlusIcon } from "lucide-react"
import { useCreateTaskModal } from "../hooks/useCreateTaskModal"
import { useGetTasks } from "../api/useGetTasks"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
import { useQueryState } from "nuqs"
import { DataFilters } from "./DataFilter"
import { useTaskFilters } from "../hooks/useTaskFilters"
import { DataTable } from "./DataTable"
import { columns } from "./Columns"
import { DataKanban } from "./DataKanban"
import { TaskStatus } from "../types"
import { useCallback } from "react"
import { useBulkUpdateTasks } from "../api/useBulkUpdateTasks"
import { DataCalendar } from "./DataCalendar"

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table"
  })

  const [{
    status,
    assigneeId,
    projectId,
    dueDate,
  }] = useTaskFilters()

  const workspaceId = useWorkspaceId()
  const { data: tasks, isLoading: isLoadingTask } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate
  })

  const { mutate: bulkUpdate } = useBulkUpdateTasks()

  const onKanbanChange = useCallback((
    tasks: { $id: string; status: TaskStatus;  position: number}[]
  ) => {
    // console.log("Kanban Tasks Update: ", tasks);
    bulkUpdate({
      json: { tasks }
    })
  }, [])

  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="table"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="calendar"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={() => open(TaskStatus.NULL)}
            size="sm"
            className="w-full lg:w-auto"
          >
            <PlusIcon className="size-4 mr-2"/>
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
          <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTask ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground"/>
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []}/>
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []}/>
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
