
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface EmptyObjectivesProps {
  type: "personal" | "team";
  onCreateClick: () => void;
  onJoinTeamClick?: () => void;
}

export const EmptyObjectives = ({ type, onCreateClick, onJoinTeamClick }: EmptyObjectivesProps) => {
  if (type === "personal") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Target className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium text-center">No personal objectives yet</h3>
          <p className="text-muted-foreground text-center mt-2">
            Create your first objective to start tracking your progress
          </p>
          <Button className="mt-4" onClick={onCreateClick}>
            <Plus className="mr-2 h-4 w-4" />
            New Objective
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Target className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-center">You are not in any teams yet</h3>
        <p className="text-muted-foreground text-center mt-2">
          Join a team to see team objectives
        </p>
        <Button className="mt-4" onClick={onJoinTeamClick}>
          Join Team
        </Button>
      </CardContent>
    </Card>
  );
};
