import { getCurrent } from "@/features/auth/queries"
import { TaskViewSwitcher } from "@/features/tasks/components/TaskViewSwitcher"
import { redirect } from "next/navigation"

const TaskPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher currentUserId={user.$id} />
    </div>
  )
}

export default TaskPage
