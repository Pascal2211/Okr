"use client"
import { Objective } from "@/types/objectives";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface StandardObjectiveCardProps {
  objective: Objective;
}

export const StandardObjectiveCard = ({ objective }: StandardObjectiveCardProps) => {
  const isCompleted = objective.status === "completed";

  const calculateProgress = (objective: Objective) => {
    if (!objective.current || !objective.target) return 0;
    const baseline = objective.baseline || 0;
    const progress = ((objective.current - baseline) / (objective.target - baseline)) * 100;
    return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
  };

  const router = useRouter()

  return (
    <Card onClick={()=> router.push(`/objectives/${objective.id}`)} className={`w-full h-full min-w-[520px] ${isCompleted ? 'bg-[#F2FCE2] border-green-200' : ''}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="line-clamp-2 text-black">{objective.title}</CardTitle>
        {isCompleted && <div className="rounded-full bg-green-100 p-1"><Check className="h-4 w-4 text-green-700" /></div>}
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {objective.description || "No description"}
        </p>

        {objective.key_results && objective.key_results.length > 0 && (
          (() => {
            const kr = objective.key_results[0];
            return (
              <div className="space-y-1">
                <div className="space-y-1">
                  <span>Key Result {kr.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p><strong>Baseline:</strong>{kr.baseline}</p>
                  <p><strong>Current:</strong> {kr.current}</p>
                  <p><strong>Target:</strong> {kr.target}</p>
                </div>
              </div>
            );
          })()
        )}
        
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full" 
            style={{ width: `${calculateProgress(objective)}%` }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          {objective.deadline && (
            <div className="flex items-center mr-4">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(objective.deadline).toLocaleDateString()}
            </div>
          )}
          {objective.owner && (
            <div className="flex items-center">
              <User className="mr-1 h-3 w-3" />
              {objective.owner}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
