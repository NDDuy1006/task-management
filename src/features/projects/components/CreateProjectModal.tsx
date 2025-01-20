"use client"

import { Modal } from "@/components/Modal"
import { CreateProjectForm } from "./CreateProjectForm"
import { useCreateProjectModal } from "../hooks/useCreateProjectModal"

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close}/>
    </Modal>
  )
}