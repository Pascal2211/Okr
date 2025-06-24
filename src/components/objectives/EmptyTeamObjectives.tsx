
import { Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyTeamObjectivesProps {
  onCreateClick: () => void;
}

export const EmptyTeamObjectives = ({ onCreateClick }: EmptyTeamObjectivesProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Target className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-center">No team objectives yet</h3>
        <p className="text-muted-foreground text-center mt-2">
          Create your first team objective to start tracking progress
        </p>
        <Button className="mt-4" onClick={onCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          New Team Objective
        </Button>
      </CardContent>
    </Card>
  );
};
