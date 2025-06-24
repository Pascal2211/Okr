"use client";

import { Team } from "@/types/team";
import { Objective } from "@/types/objectives";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ObjectivesList } from "./ObjectivesList";
import { EmptyObjectives } from "./EmptyObjectives";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TeamObjectiveCreator } from "./TeamObjectiveCreator";

interface TeamObjectivesTabProps {
  teams: Team[] | null;
  objectives: Objective[];
  selectedTeam: string | null;
  onTeamSelect: (teamId: string) => void;
  onCreateClick: () => void;
  statusFilter: string | null;
  setStatusFilter: (filter: string | null) => void;
}

export function TeamObjectivesTab({
  teams = [],
  objectives,
  selectedTeam,
  onTeamSelect,
  onCreateClick,
  statusFilter,
  setStatusFilter,
}: TeamObjectivesTabProps) {
  if (!teams || teams.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">
            You are not part of any team. Create a team to start working on team objectives.
          </p>
          <Button className="mt-4" onClick={() => onCreateClick()}>
            Create Team
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={selectedTeam || ""} onValueChange={onTeamSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button 
            variant={!statusFilter ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter(null)}
            className={!statusFilter ? "bg-black text-white hover:bg-[#0000]/90 hover:text-white" : "text-black hover:bg-[#0EA5E9]/10 hover:text-white"}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'active' ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter('active')}
            className={statusFilter === 'active' ? "bg-black text-white hover:bg-[#0000]/90 hover:text-white" : "text-black hover:bg-[#0EA5E9]/10 hover:text-white"}
          >
            <Circle className="mr-1 h-3 w-3" /> Active
          </Button>
          <Button 
            variant={statusFilter === 'completed' ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter('completed')}
            className={statusFilter === 'completed' ? "bg-black text-white hover:bg-[#0000]/90 hover:text-white" : "text-black hover:bg-[#0EA5E9]/10 hover:text-white"}
          >
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Button>
        </div>
      </div>

      {selectedTeam && (
        <div className="flex justify-end">
          <TeamObjectiveCreator teamId={selectedTeam} />
        </div>
      )}

      {objectives.length === 0 ? (
        <EmptyObjectives 
          type="team" 
          onCreateClick={onCreateClick} 
        />
      ) : (
        <ObjectivesList objectives={objectives} />
      )}
    </div>
  );
}