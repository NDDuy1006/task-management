"use client"

import { Modal } from "@/components/Modal"
import { CreateWorkspaceForm } from "./CreateWorkspaceForm"
import { useCreateWorkspaceModal } from "../hooks/useCreateWorkspaceModal"

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close}/>
    </Modal>
  )
}