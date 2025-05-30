/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId"
// import { useRouter } from "next/navigation"
import { useCreateTask } from "../api/useCreateTask"
import { useForm } from "react-hook-form"
import { createTaskSchema } from "../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DottedSeparator } from "@/components/DottedSeparator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/DatePicker"
import { MemberAvatar } from "@/features/members/components/MemberAvatar"
import { TaskStatus } from "../types"
import { ProjectAvatar } from "@/features/projects/components/ProjectAvatar"

interface CreateTaskFormProps {
  taskStatus?: TaskStatus;
  onCancel?: () => void;
  projectOptions: {
    id: string,
    name: string,
    imageUrl: string
  }[]
  memberOptions: {
    id: string,
    name: string
  }[]
}

export const CreateTaskForm = ({
  taskStatus,
  onCancel,
  projectOptions,
  memberOptions
}: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateTask()

  const form = taskStatus === TaskStatus.NULL
    ? useForm<z.infer<typeof createTaskSchema>>({
      resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
      defaultValues: {
        workspaceId,
        imageUrls: []
      }
  }) : useForm<z.infer<typeof createTaskSchema>>({
      resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
      defaultValues: {
        workspaceId,
        status: taskStatus,
        imageUrls: []
      }
  })

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    // Convert File objects to base64 strings
    const finalImages = values.imageUrls?.filter(Boolean) || [];
    const imagesForBackend = await Promise.all(
      finalImages.map(async (item) => {
        if (item instanceof File) {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(item);
          });
        }
        return item; // If it's already a string, keep it
      })
    );

    const finalValues = {
      ...values,
      workspaceId,
      imageUrls: imagesForBackend,
    };
    
    mutate({
      json: finalValues
    }, {
      onSuccess: () => {
        form.reset();
        onCancel?.()
        //TODO: redirect to new task
      }
    })
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new task
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Task name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter task name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <DatePicker {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Asignee
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee"/>
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {memberOptions.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              <div className="flex items-center gap-x-2">
                                <MemberAvatar
                                  className="size-6"
                                  name={member.name}
                                />
                                {member.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status"/>
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value={TaskStatus.BACKLOG}>
                            Backlog
                          </SelectItem>
                          <SelectItem value={TaskStatus.TODO}>
                            To Do
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>
                            In Progress
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_REVIEW}>
                            In Review
                          </SelectItem>
                          <SelectItem value={TaskStatus.DONE}>
                            Done
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project
                    </FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project"/>
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projectOptions.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              <div className="flex items-center gap-x-2">
                                <ProjectAvatar
                                  className="size-6"
                                  name={project.name}
                                  image={project.imageUrl}
                                />
                                {project.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
              >
                Create task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
