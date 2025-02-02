"use client"

import { PageError } from "@/components/PageError"
import { PageLoader } from "@/components/PageLoader"
import { useGetProject } from "@/features/projects/api/useGetProject"
import { EditProjectForm } from "@/features/projects/components/EditProjectForm"
import { useProjectId } from "@/features/projects/hooks/useProjectId"

export const ProjectIdSettingsClient = () => {
  const projectId = useProjectId()
  const { data: initialValues, isPending } = useGetProject({ projectId })

  if (isPending) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="Project Not Found."/>
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues}/>
    </div>
  )
}
