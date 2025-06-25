import { Objective } from "@/types/objectives";
import { StandardObjectiveCard } from "./StandardObjectiveCard";
import { KeyResultsObjectiveCard } from "./KeyResultsObjectiveCard";
import { ValuesObjectiveCard } from "./ValuesObjectiveCard";
import { ObjectiveRowsCard } from "./ObjectiveRowsCard";
import { Badge } from "@/components/ui/badge";

interface ObjectivesListProps {
  objectives: Objective[];
}

export const ObjectivesList = ({ objectives }: ObjectivesListProps) => {
  // Separate active and completed objectives
  const activeObjectives = objectives.filter(obj => obj.status !== "completed");
  const completedObjectives = objectives.filter(obj => obj.status === "completed");

  console.log("ObjectivesList: activeObjectives", activeObjectives);
  console.log("ObjectivesList: completedObjectives", completedObjectives);

  // const renderObjectiveCard = (objective: Objective) => {
  //   const isTeamObjective = objective.team_id ? true : false;

  //   const ObjectiveWithBadge = (
  //     <div className="w-full h-full">
  //       <div className="absolute right-3 top-3 z-10">
  //         <Badge 
  //           variant="secondary" 
  //           className={isTeamObjective ? 
  //             "bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/80" : 
  //             "bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/80"
  //           }
  //         >
  //           {isTeamObjective ? "Company" : "Personal"}
  //         </Badge>
  //       </div>
        
  //       {renderObjectiveByType(objective)}
  //     </div>
  //   );

  //   return ObjectiveWithBadge;
  // };

  const renderObjectiveByType = (objective: Objective) => {
    console.log("Rendering objective type:", objective.type, "for", objective);
    switch(objective.type) {
      case "standard":
        return <StandardObjectiveCard objective={objective} />;
      case "key_results":
        return <KeyResultsObjectiveCard objective={objective} />;
      case "objective_rows":
        return <ObjectiveRowsCard objective={objective} />;
      case "values":
        return <ValuesObjectiveCard objective={objective} />;
      default:
        return <div style={{color: 'red'}}>Unknown type: {String(objective.type)}</div>;
    }
  };

  if (objectives.length > 0) {
    return (
      <div>
        <div className="space-y-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-10 w-full">
            {activeObjectives.map((objective) => (
              <div className="relative w-full h-full" key={objective.id}>
                <div className="absolute right-3 top-3 z-10"></div>
                {renderObjectiveByType(objective)}
              </div>
            ))}
          </div>

          {completedObjectives.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 mt-8">Finished Objectives</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 max-w-screen-xl mx-auto overflow-hidden">
                {completedObjectives.map((objective) => (
                  <div className="relative w-full h-full" key={objective.id}>
                    <div className="absolute right-3 top-3 z-10">
                      <Badge
                        variant="secondary"
                        className={
                          objective.team_id
                            ? "bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/80"
                            : "bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/80"
                        }
                      >
                        {objective.team_id ? "Company" : "Personal"}
                      </Badge>
                    </div>
                    {renderObjectiveByType(objective)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <div>No objectives found</div>;
};
