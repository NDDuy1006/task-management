"use client"

import { Analytics } from "@/components/Analytics"
import { DottedSeparator } from "@/components/DottedSeparator"
import { PageError } from "@/components/PageError"
import { PageLoader } from "@/components/PageLoader"
import { Button } from "@/components/ui/button"
import { useGetMembers } from "@/features/members/api/useGetMembers"
import { useGetProjects } from "@/features/projects/api/useGetProjects"
import { useCreateProjectModal } from "@/features/projects/hooks/useCreateProjectModal"
import { useGetTasks } from "@/features/tasks/api/useGetTasks"
import { useCreateTaskModal } from "@/features/tasks/hooks/useCreateTaskModal"
import { TaskStatus, TaskType } from "@/features/tasks/types"
import { useGetWorkspaceAnalytics } from "@/features/workspaces/hooks/useGetWorkspaceAnalytics"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react"
import { formatDistanceToNow, isPast } from "date-fns"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectType } from "@/features/projects/types"
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar"
import { MemberType } from "@/features/members/type"
import { MemberAvatar } from "@/features/members/components/MemberAvatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export const WorkspaceClient = () => {
  const workspaceId = useWorkspaceId()

  const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId })
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })

  const isLoading = 
    isLoadingAnalytics
    || isLoadingTasks
    || isLoadingProjects
    || isLoadingMembers
  
  if (isLoading) {
    return <PageLoader />
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Fail to load workspace data"/>
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <div className="flex flex-col gap-4">
          <ProjectList data={projects.documents} total={projects.total} />
          <MemberList data={members.documents} total={members.total} />
        </div>
      </div>
    </div>
  )
}

interface TaskListProps {
  data: TaskType[];
  total: number
}

export const TaskList = ({ data, total }: TaskListProps) => {
  const workspaceId = useWorkspaceId()
  const { open: createTask } = useCreateTaskModal()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Recent Tasks ({total})
          </p>
          <Button
            variant="muted"
            size="icon"
            onClick={() => createTask(TaskStatus.NULL)}
          >
            <PlusIcon className="size-4 text-neutral-400"/>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ScrollArea
          className="rounded-lg whitespace-nowrap shrink-0 min-h-[120px] h-[460px] min-w-full"
        >
          <ul className="flex flex-col gap-y-4">
            {data.map((task) => (
              <li key={task.$id}>
                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                  <Card className="shadow-non rounde-lg hover:opacity-75 transition">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p>
                          {task.project?.name}
                        </p>
                        <div className="size-1 rounded-full bg-neutral-3"/>
                        <div
                          className="text-sm text-muted-foreground items-center hidden md:flex"
                        >
                          <CalendarIcon className="size-3 mr-1" />
                          <span className="truncate">
                            Due date: 
                            {
                              isPast(new Date(task.dueDate))
                                ? ` ${formatDistanceToNow(new Date(task.dueDate))} ago`
                                : ` in ${formatDistanceToNow(new Date(task.dueDate))}`
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No tasks found
            </li>
          </ul>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
        <Button variant="muted" className="mt-4 w-full">
          <Link href={`/workspaces/${workspaceId}/tasks`}>
            View All
          </Link>
        </Button>
      </div>
    </div>
  )
}

interface ProjectListProps {
  data: ProjectType[];
  total: number
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
  const workspaceId = useWorkspaceId()
  const { open: createProject } = useCreateProjectModal()

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Projects ({total})
          </p>
          <Button
            variant="muted"
            size="icon"
            onClick={createProject}
          >
            <PlusIcon className="size-4 text-neutral-400"/>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => (
            <li key={project.$id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-non rounde-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      className="size-12"
                      fallbackClassname="text-lg"
                      name={project.name}
                      image={project.imageUrl}
                    />
                    <p className="text-lg font-medium truncate">{project.name}</p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No projects found
          </li>
        </ul>
      </div>
    </div>
  )
}

interface MemberListProps {
  data: MemberType[];
  total: number
}

export const MemberList = ({ data, total }: MemberListProps) => {
  const workspaceId = useWorkspaceId()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Members ({total})
          </p>
          <Button
            asChild
            variant="muted"
            size="icon"
          >
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400"/>
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-non rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <MemberAvatar
                    className="size-12"
                    name={member.name}
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">{member.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1 overflow-hidden text-ellipsis">{member.email}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  )
}