import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Circle, Archive } from "lucide-react";

interface PersonalStatusCardProps {
  stats: {
    activeObjectives: number;
    completedObjectives: number;
  };
}

export const PersonalStatusCard = ({ stats }: PersonalStatusCardProps) => {
  const totalObjectives = stats.activeObjectives + stats.completedObjectives;

  return (
    <Card className="col-span-1 max-w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Status</CardTitle>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Archive className="h-5 w-5 mr-3 text-gray-500" />
              <p className="font-medium">Total Objectives</p>
            </div>
            <p className="text-2xl font-bold">{totalObjectives}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Circle className="h-5 w-5 mr-3 text-blue-500" />
              <p className="font-medium">Active Objectives</p>
            </div>
            <p className="text-2xl font-bold">{stats.activeObjectives}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
              <p className="font-medium">Completed Objectives</p>
            </div>
            <p className="text-2xl font-bold">{stats.completedObjectives}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
