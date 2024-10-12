import { getCurrent } from "@/features/auth/actions"
import { CreateWorkspaceForm } from "@/features/workspaces/components/CreateWorkSpaceForm"
import { redirect } from "next/navigation"

export default async function Home() {
  const currentUser = await getCurrent()

  if (!currentUser) redirect("/sign-in")

  return (
    <div className="bg-muted">
      <CreateWorkspaceForm/>
    </div>
  )
}
