import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface TeamStatusCardProps {
  activeObjectives: number;
  completedObjectives: number;
}

export const TeamStatusCard = ({ activeObjectives, completedObjectives }: TeamStatusCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Status</CardTitle>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Active Objectives</span>
            <span className="text-2xl font-bold text-blue-600">{activeObjectives}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Completed Objectives</span>
            <span className="text-2xl font-bold text-green-600">{completedObjectives}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
