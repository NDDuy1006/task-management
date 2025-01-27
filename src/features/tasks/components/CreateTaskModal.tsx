"use client"

import { Modal } from "@/components/Modal"
import { useCreateTaskModal } from "../hooks/useCreateTaskModal"
import { CreateTaskFormWrapper } from "./CreateTaskFormWrapper"

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close, taskStatus } = useCreateTaskModal()
  
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <CreateTaskFormWrapper
          onCancel={close}
          taskStatus={taskStatus || null}
        />
      </div>
    </Modal>
  )
}