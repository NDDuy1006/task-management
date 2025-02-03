import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation"
import { InviteCodeClient } from "./InviteCodeClient"


const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return (
    <InviteCodeClient />
  );
}
 
export default WorkspaceIdJoinPage;