"use client"

import { Modal } from "@/components/Modal"
import { useCreateTaskModal } from "../hooks/useCreateTaskModal"
import { CreateTaskModalWrapper } from "./CreateTaskModalWrapper"

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <CreateTaskModalWrapper onCancel={close}/>
      </div>
    </Modal>
  )
}