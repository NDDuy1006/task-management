"use client"

import { PageError } from "@/components/PageError"
import { PageLoader } from "@/components/PageLoader"
import { EditWorkspaceForm } from "@/features/workspaces/components/EditWorkspaceForm"
import { useGetWorkspace } from "@/features/workspaces/hooks/useGetWorkspace"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"

export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId()
  const { data: initialValues, isPending } = useGetWorkspace({ workspaceId })

  if (isPending) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="Workspace Not Found."/>
  }
  
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues}/>
    </div>
  )
}
