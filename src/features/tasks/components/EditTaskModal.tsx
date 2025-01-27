"use client"

import { Modal } from "@/components/Modal"
import { CreateTaskModalWrapper } from "./CreateTaskFormWrapper"
import { useEditTaskModal } from "../hooks/useEditTaskModal"
import { EditTaskFormWrapper } from "./EditTaskFormWrapper"

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal()

  return (
    <Modal open={!!taskId} onOpenChange={close}>
      {taskId && (
        <EditTaskFormWrapper onCancel={close} id={taskId} />
      )}
    </Modal>
  )
}