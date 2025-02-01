import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation"
import { TaskIdClient } from "./TaskIdClient"

const TaskIdPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return <TaskIdClient />
}

export default TaskIdPage