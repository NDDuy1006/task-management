import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TextSearch, TrashIcon } from "lucide-react";

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
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => { }}
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
            onClick={() => { }}
            disabled={false}
            className="font-medium p-[10px] hover:cursor-pointer"
          >
            <ExternalLinkIcon className="siz-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => { }}
            disabled={false}
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