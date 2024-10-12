import { getCurrent } from "@/features/auth/actions"
import { redirect } from "next/navigation"

export default async function Home() {
  const currentUser = await getCurrent()

  if (!currentUser) redirect("/sign-in")

  return (
    <div className="flex gap-4">
      This is a homepage
    </div>
  )
}
