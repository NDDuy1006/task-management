"use client"

import { UserButton } from "@/features/auth/components/UserButton"
import { MobileSidebar } from "./MobileSidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const pathnameMap = {
  "tasks": {
    title: "My tasks",
    description: "View all tasks here"
  },
  "projects": {
    title: "My projects",
    description: "View all projects here"
  }
}

const defaultMap = {
  title: "Home",
  description: "Monitor highlighted projects and tasks"
}

export const Navbar = () => {
  const pathname = usePathname()
  const pathnameParts = pathname.split("/")
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap
  console.log(pathnameParts);

  const isNavbarHidden = pathnameParts[3] === 'projects' ? "hidden" : "flex"
  
  const {title, description} = pathnameMap[pathnameKey] || defaultMap

  return ( 
    <nav className={cn(
      isNavbarHidden,
      "pt-4 px-6 items-center justify-between"
    )}>
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  )
}