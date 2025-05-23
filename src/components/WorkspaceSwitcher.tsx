"use client"

import { RiAddCircleFill } from "react-icons/ri"
import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { WorkspaceAvatar } from "@/features/workspaces/components/WorkspaceAvatar"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal"

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const { data: workspaces } = useGetWorkspaces()
  const { open } = useCreateWorkspaceModal()

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((item) => (
            <SelectItem key={item.$id} value={item.$id}>
              <div className="flex justify-start items-center gap-3 font-medium cursor-pointer">
                <WorkspaceAvatar name={item.name} image={item.imageUrl} />
                <span className="truncate max-w-[300px] lg:max-w-[128px]">{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}