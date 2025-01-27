"use client"

import { useQueryState, parseAsBoolean, parseAsString, parseAsStringEnum } from 'nuqs'
import { useState } from 'react'
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
    parseAsStringEnum<TaskStatus | "">(Object.values(TaskStatus))
      .withDefault("")
      .withOptions({ clearOnDefault: true })
  )

  const open = (taskStatus: TaskStatus) => {
    setTaskStatus(taskStatus)
    setIsOpen(true)
  }
  console.log(taskStatus);
  
  const close = () => {
    // setIsOpen(false)
    // setTaskStatus("")
  }

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    taskStatus
  }
}