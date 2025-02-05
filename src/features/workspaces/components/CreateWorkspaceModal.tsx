"use client"

import { Modal } from "@/components/Modal"
import { useCreateWorkspaceModal } from "../hooks/useCreateWorkspaceModal"
import { CreateWorkspaceForm } from "./create-workspace-form"

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close}/>
    </Modal>
  )
}