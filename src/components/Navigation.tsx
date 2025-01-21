"use client"

import { cn } from "@/lib/utils"
import { SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go"
import { usePathname } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"

const routes = [
  {
    lable: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill
  },
  {
    lable: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill
  },
  {
    lable: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: GoCheckCircleFill
  },
  {
    lable: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon
  }
]

export const Navigation = () => {
  const workspaceId = useWorkspaceId()
  const pathname = usePathname()

  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`
        const isActive = pathname === fullHref
        const Icon = isActive ? item.activeIcon : item.icon

        return (
          <Link key={item.href} href={fullHref}>
            <div className={cn(
              "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500 text-base",
              isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
            )}>
              <Icon className="size-5 text-neutral-500"/>
              {item.lable}
            </div>
          </Link>
        )
      })}
    </ul>
  )
}