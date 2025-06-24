
import { Objective } from "@/types/objectives";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, RefreshCcw } from "lucide-react";
import { useObjectives } from "@/hooks/useObjectives";

interface ObjectiveRowsCardProps {
  objective: Objective;
}

export const ObjectiveRowsCard = ({ objective }: ObjectiveRowsCardProps) => {
  const { toggleObjectiveStatus } = useObjectives();
  const isCompleted = objective.status === "completed";

  return (
    <Card className={`${isCompleted ? 'bg-[#F2FCE2] border-green-200' : ''}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-xl">{objective.title}</CardTitle>
        {isCompleted && <div className="rounded-full bg-green-100 p-1"><Check className="h-4 w-4 text-green-700" /></div>}
      </CardHeader>
      <CardContent>
        {objective.description && (
          <p className="text-muted-foreground mb-4">{objective.description}</p>
        )}
        
        <div className="space-y-4">
          {objective.objective_rows && objective.objective_rows.map((row) => (
            <div key={row.id} className="border-t pt-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="font-medium">{row.title}</div>
                <div className="text-sm text-muted-foreground">
                  {row.owner && <span>Owner: {row.owner}</span>}
                </div>
              </div>
              
              {(row.baseline !== null || row.current !== null || row.target !== null) && (
                <div className="mt-2">
                  {row.baseline !== null && row.target !== null && row.current !== null && (
                    <>
                      <Progress 
                        value={((row.current - row.baseline) / (row.target - row.baseline)) * 100} 
                        className="h-2 mt-2" 
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>{row.baseline}</span>
                        <span>{row.current} / {row.target}</span>
                      </div>
                    </>
                  )}
                  
                  {(row.baseline === null || row.target === null || row.current === null) && (
                    <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <span className="text-muted-foreground">Baseline:</span>{" "}
                        {row.baseline !== null ? row.baseline : "N/A"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current:</span>{" "}
                        {row.current !== null ? row.current : "N/A"}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target:</span>{" "}
                        {row.target !== null ? row.target : "N/A"}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {row.comment && (
                <p className="text-sm text-muted-foreground mt-2">
                  {row.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => toggleObjectiveStatus(objective)}
        >
          {isCompleted ? (
            <>
              <RefreshCcw className="h-3 w-3 mr-1" />
              Reopen
            </>
          ) : (
            <>
              <Check className="h-3 w-3 mr-1" />
              Complete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
