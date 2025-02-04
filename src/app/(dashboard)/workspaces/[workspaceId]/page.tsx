import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceClient } from "./WorkspaceClient";

const WorkspaceIdPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")
  
  return (
    <WorkspaceClient/>
  );
}
 
export default WorkspaceIdPage;