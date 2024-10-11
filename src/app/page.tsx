import { getCurrent } from "@/features/auth/actions"
import { UserButton } from "@/features/auth/components/UserButton"
import { redirect } from "next/navigation"

export default async function Home() {
  const currentUser = await getCurrent()

  if (!currentUser) redirect("/sign-in")

  return (
    <div className="flex gap-4">
      <UserButton />
    </div>
  )
}
