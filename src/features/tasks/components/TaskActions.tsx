import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TextSearch, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useConfirm } from "@/hooks/useConfirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode
}

export const TaskActions = ({
  id,
  projectId,
  children
}: TaskActionsProps) => {
  const workspaceId = useWorkspaceId()

  const router = useRouter()

  const {
    mutate,
    isPending
  } = useDeleteTask()

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Task",
    "This action cannot be undone.",
    "destructive"
  )

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) return

    mutate({
      param: {taskId: id}
    })
  }

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <DeleteDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            disabled={false}
            className="font-medium p-[10px] hover:cursor-pointer"
          >
            <TextSearch className="siz-4 mr-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => { }}
            disabled={false}
            className="font-medium p-[10px] hover:cursor-pointer"
          >
            <PencilIcon className="siz-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            disabled={false}
            className="font-medium p-[10px] hover:cursor-pointer"
          >
            <ExternalLinkIcon className="siz-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="font-medium p-[10px] text-amber-700 focus:text-amber-700 hover:cursor-pointer"
          >
            <TrashIcon className="siz-4 mr-2 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}