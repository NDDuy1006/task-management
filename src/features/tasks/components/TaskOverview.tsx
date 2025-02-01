import { Button } from "@/components/ui/button";
import { TaskType } from "../types";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/DottedSeparator";
import { OverviewProperty } from "./OverviewProperty";
import { MemberAvatar } from "@/features/members/components/MemberAvatar";
import TaskDate from "./TaskDate";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/useEditTaskModal";


interface TaskOverviewProps {
  task: TaskType
}

export const TaskOverview = ({
  task
}: TaskOverviewProps) => {
  const { open } = useEditTaskModal()

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button
            onClick={() => open(task.$id)}
            size="sm"
            variant="secondary"
          >
            <PencilIcon
              className="size-4 mr-2"
            />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar
              name={task.assignee.name}
              className="size-6"
            />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium"/>
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  )
}
