import { ProjectAnalyticsResponsType } from "@/features/projects/api/useGetProjectAnalytics"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { AnalyticsCard } from "./AnalyticsCard"
import { DottedSeparator } from "./DottedSeparator";

export const Analytics = ({ data }: ProjectAnalyticsResponsType) => {
  const analyticsData = [
    { title: "Total tasks", value: data.taskCount, difference: data.taskDifference },
    { title: "Assigned tasks", value: data.assignedTaskCount, difference: data.assignedTaskDifference },
    { title: "Completed tasks", value: data.completedTaskCount, difference: data.completedTaskDifference },
    { title: "Overdue tasks", value: data.overdueTaskCount, difference: data.overdueTaskDifference },
    { title: "Incomplete tasks", value: data.incompleteTaskCount, difference: data.incompleteTaskDifference },
  ]
  
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        {analyticsData.map((item, index) => (
          <div key={index} className="flex items-center flex-1">
            <AnalyticsCard
              title={item.title}
              value={item.value}
              variant={item.difference > 0 ? "up" : "down"}
              increaseVlue={item.difference}
            />
            {
              index < analyticsData.length - 1
              && <DottedSeparator direction="vertical"/>
            }
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal"/>
    </ScrollArea>
  )
}
