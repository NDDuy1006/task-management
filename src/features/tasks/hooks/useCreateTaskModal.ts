"use client"

import { useQueryState, parseAsBoolean, parseAsStringEnum } from 'nuqs'
import { TaskStatus } from '../types'

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true })
  )

  const [taskStatus, setTaskStatus] = useQueryState(
    "task-status",
    parseAsStringEnum<TaskStatus>(Object.values(TaskStatus))
      .withDefault(TaskStatus.NULL)
      .withOptions({ clearOnDefault: true })
  )
  
  const open = (taskStatus: TaskStatus) => {
    setIsOpen(true)
    setTaskStatus(taskStatus)
  }
  const close = () => {
    setIsOpen(false)
    setTaskStatus(TaskStatus.NULL)
  }

  return {
    isOpen,
    open,
    close,
    taskStatus,
    setIsOpen
  }
}

/*
  TASK STATUS PARAM IN URL
  The problem is the Diaglog component, it doesn't have the close attribute
  The close method is only called in the Cancel button within the form

*/