import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceClinet } from "./WorkspaceClient";

const WorkspaceIdPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")
  
  return (
    <WorkspaceClinet />
  );
}
 
export default WorkspaceIdPage;