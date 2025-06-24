
import { Objective } from "@/types/objectives";
import { ObjectivesList } from "./ObjectivesList";
import { EmptyObjectives } from "./EmptyObjectives";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

interface PersonalObjectivesTabProps {
  objectives: Objective[];
  onCreateClick: () => void;
  statusFilter: string | null;
  setStatusFilter: (filter: string | null) => void;
}

export const PersonalObjectivesTab = ({ 
  objectives, 
  onCreateClick,
  statusFilter,
  setStatusFilter
}: PersonalObjectivesTabProps) => {
  return (
    <div className="">
      <div className="flex mb-4 space-x-2">
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

      {objectives.length === 0 ? (
        <EmptyObjectives 
          type="personal" 
          onCreateClick={onCreateClick} 
        />
      ) : (
        <ObjectivesList objectives={objectives} />
      )}
    </div>
  );
};
