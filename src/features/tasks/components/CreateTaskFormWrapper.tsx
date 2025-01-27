import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useGetProjects } from "@/features/projects/api/useGetProjects";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./CreateTaskForm";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
}

export const CreateTaskModalWrapper = ({
  onCancel
}: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId()
  const {
    data: projects,
    isLoading: isLoadingProjects
  } = useGetProjects({ workspaceId })
  const {
    data: members,
    isLoading: isLoadingMembers
  } = useGetMembers({ workspaceId })

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl
  }))

  const memberOptions = members?.documents.map((project) => ({
    id: project.$id,
    name: project.name
  }))

  const isLoading = isLoadingMembers || isLoadingProjects
  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground"/>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <CreateTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions ?? []}
        memberOptions={memberOptions ?? []}
      />
    </div>
  )
}
