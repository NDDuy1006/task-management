"use client"

import { DottedSeparator } from "@/components/DottedSeparator"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
 } from "@/components/ui/tabs"
import { Loader, PlusIcon } from "lucide-react"
import { useCreateTaskModal } from "../hooks/useCreateTaskModal"
import { useGetTasks } from "../api/useGetTasks"
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
import { useQueryState } from "nuqs"
import { DataFilters } from "./DataFilter"
import { useTaskFilters } from "../hooks/useTaskFilters"
import { columns } from "./columns"
import { DataTable } from "./DataTable"

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table"
  })

  const [{
    status,
    assigneeId,
    projectId,
    dueDate,
  }] = useTaskFilters()

  const workspaceId = useWorkspaceId()
  const { data: tasks, isLoading: isLoadingTask } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate
  })

  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="table"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="calendar"
            >
              Calenda
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={open}
            size="sm"
            className="w-full lg:w-auto"
          >
            <PlusIcon className="size-4 mr-2"/>
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
          <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTask ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground"/>
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []}/>
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
