import { Models } from "node-appwrite";

export enum TaskStatus {
  NULL = "NULL",
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE"
}

export type TaskType = Models.Document & {
  name: string;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
  position: number;
  dueDate: string;
  description?: string;
  imageUrls?: string[]
}