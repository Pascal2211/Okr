import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ObjectiveTypeSelectorProps {
  objectiveType: "standard" | "key_results" | "objective_rows" | "values";
  setObjectiveType: React.Dispatch<React.SetStateAction<"standard" | "key_results" | "objective_rows" | "values">>;
}

export const ObjectiveTypeSelector = ({
  objectiveType,
  setObjectiveType
}: ObjectiveTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="objective-type">Objective Type</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p>Choose between different objective types:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Simple: One objective with a single key result</li>
                <li>Flexible: One objective with multiple key results</li>
                <li>Advanced: Detailed tracking with baseline, current, target values</li>
                <li>Values: Define company values and their explanations</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select 
        defaultValue={objectiveType}
        onValueChange={(value: "standard" | "key_results" | "objective_rows" | "values") => setObjectiveType(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select objective type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Simple Objective</SelectItem>
          <SelectItem value="key_results">Flexible Objective</SelectItem>
          <SelectItem value="objective_rows">Advanced Objective</SelectItem>
          <SelectItem value="values">Simple Value</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
