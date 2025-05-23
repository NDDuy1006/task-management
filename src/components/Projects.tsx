"use client"

import { useGetProjects } from "@/features/projects/api/useGetProjects"
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar"
import { useCreateProjectModal } from "@/features/projects/hooks/useCreateProjectModal"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiAddCircleFill } from "react-icons/ri"

export const Projects = () => {
  // const projectId = null TODO
  const pathname = usePathname()
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId()
  const { data: projects } = useGetProjects({ workspaceId })

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
      </div>
      {projects?.documents.map((item) => {
        const href = `/workspaces/${workspaceId}/projects/${item.$id}`
        const isActive = pathname === href

        return (
          <Link href={href} key={item.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shad-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar
                className="min-w-5"
                image={item.imageUrl}
                name={item.name}
              />
              <span className="truncate text-sm">{item.name}</span>
            </div>
          </Link>
        )
      }) }
    </div>
  )
}