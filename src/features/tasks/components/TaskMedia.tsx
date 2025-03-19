import { useState } from "react"
import { useUpdateTask } from "../api/useUpdateTask"
import { Button } from "@/components/ui/button"
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeparator } from "@/components/DottedSeparator";


interface TaskMediaProps {
  images?: string[]
  id: string
}

export const TaskMedia = ({
  images,
  id
}: TaskMediaProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const { mutate, isPending } = useUpdateTask()

  const handleSave = () => {
    mutate({
      json: { images: value },
      param: { taskId: id }
    }, {
      onSuccess: () => {
        setIsEditing(false)
      }
    })
  }

  return (
    <div className="p-4 border rounded-lg">
    <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Task Media</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2"/>
          ): (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
    </div>
    <DottedSeparator className="my-4" />
  </div>
  )
}