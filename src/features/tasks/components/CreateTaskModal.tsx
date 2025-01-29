"use client"

import { Modal } from "@/components/Modal"
import { useCreateTaskModal } from "../hooks/useCreateTaskModal"
import { CreateTaskModalWrapper } from "./CreateTaskFormWrapper"

export const CreateTaskModal = () => {
  const { isOpen, close, taskStatus } = useCreateTaskModal()

  return (
    <Modal
      open={isOpen}
      onOpenChange={
        (open) => {
          if (!open) {
            close()
          }
        }
      }
    >
      <CreateTaskModalWrapper onCancel={close} taskStatus={taskStatus} />
    </Modal>
  )
}