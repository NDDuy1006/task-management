"use client"

import { PageError } from "@/components/PageError"
import { PageLoader } from "@/components/PageLoader"
import { JoinWorkspaceForm } from "@/features/workspaces/components/JoinWorkspaceForm"
import { useGetWorkspaceInfo } from "@/features/workspaces/hooks/useGetWorkspaceInfo"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"

export const InviteCodeClient = () => {
  const workspaceId = useWorkspaceId()
    const { data: initialValues, isPending } = useGetWorkspaceInfo({ workspaceId })
  
    if (isPending) {
      return <PageLoader />
    }
  
    if (!initialValues) {
      return <PageError message="Workspace Not Found."/>
    }


  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues}/>
    </div>
  )
}
