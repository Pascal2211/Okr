import { Objective } from "@/types/objectives";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, RefreshCcw } from "lucide-react";
import { useObjectives } from "@/hooks/useObjectives";

interface KeyResultsObjectiveCardProps {
  objective: Objective;
}

export const KeyResultsObjectiveCard = ({ objective }: KeyResultsObjectiveCardProps) => {
  const { toggleObjectiveStatus } = useObjectives();
  const isCompleted = objective.status === "completed";

  return (
    <Card className={`mb-6 ${isCompleted ? 'bg-[#F2FCE2] border-green-200' : ''}`}>
      <CardHeader className="bg-[#0D3B46] text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <div className="w-8 h-8 bg-white text-[#0D3B46] mr-4 flex items-center justify-center text-lg font-bold">-</div>
            {objective.title}
          </CardTitle>
          {isCompleted && <div className="rounded-full bg-green-400 p-1"><Check className="h-4 w-4 text-white" /></div>}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {objective.keyResult && objective.keyResult.map((kr, index) => (
          <div key={kr.id || index} className={`p-4 ${index % 2 === 0 ? 'bg-[#395F6B] text-white' : 'bg-[#B0CDD6] text-[#0D3B46]'}`}>
            <div className="flex items-center">
              {index % 2 === 0 ? (
                <div className="w-6 h-6 bg-white text-[#0D3B46] mr-4 flex items-center justify-center text-sm font-bold">-</div>
              ) : (
                <div className="w-6 h-6 bg-white text-[#0D3B46] mr-4 flex items-center justify-center text-sm font-bold border-2 border-[#0D3B46]">+</div>
              )}
              {kr.title}
            </div>
            <div className="grid grid-cols-6 gap-4 mt-4">
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Key Result</p>
                <p className="mt-2">{kr.title}</p>
              </div>
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Baseline</p>
                <p className="mt-2">{kr.baseline}</p>
              </div>
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Current</p>
                <p className="mt-2">{kr.current}</p>
              </div>
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Target</p>
                <p className="mt-2">{kr.target}</p>
              </div>
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Comment</p>
                <p className="mt-2">{kr.comment || "N/A"}</p>
              </div>
              <div className="bg-[#2D4D58] p-3 text-white text-center">
                <p className="text-sm">Owner</p>
                <p className="mt-2">{kr.owner || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end p-4">
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
