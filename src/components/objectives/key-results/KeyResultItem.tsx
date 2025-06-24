
import { KeyResult } from "@/types/objectives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface KeyResultItemProps {
  keyResult: KeyResult;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof KeyResult, value: any) => void;
  teamMembers?: { id: string; full_name: string }[];
}

export const KeyResultItem = ({ 
  keyResult, 
  onRemove, 
  onChange, 
  teamMembers = [] 
}: KeyResultItemProps) => {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex justify-between">
        <h4 className="font-medium">Key Result</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(keyResult.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor={`kr-title-${keyResult.id}`}>Title</Label>
          <Input
            id={`kr-title-${keyResult.id}`}
            value={keyResult.title}
            onChange={(e) => onChange(keyResult.id, "title", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`kr-baseline-${keyResult.id}`}>Baseline</Label>
            <Input
              id={`kr-baseline-${keyResult.id}`}
              type="number"
              value={keyResult.baseline !== null ? keyResult.baseline : ""}
              onChange={(e) => onChange(keyResult.id, "baseline", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
          <div>
            <Label htmlFor={`kr-current-${keyResult.id}`}>Current</Label>
            <Input
              id={`kr-current-${keyResult.id}`}
              type="number"
              value={keyResult.current !== null ? keyResult.current : ""}
              onChange={(e) => onChange(keyResult.id, "current", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
          <div>
            <Label htmlFor={`kr-target-${keyResult.id}`}>Target</Label>
            <Input
              id={`kr-target-${keyResult.id}`}
              type="number"
              value={keyResult.target !== null ? keyResult.target : ""}
              onChange={(e) => onChange(keyResult.id, "target", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`kr-comment-${keyResult.id}`}>Comment</Label>
          <Input
            id={`kr-comment-${keyResult.id}`}
            value={keyResult.comment}
            onChange={(e) => onChange(keyResult.id, "comment", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor={`kr-owner-${keyResult.id}`}>Assigned to</Label>
          {teamMembers.length > 0 ? (
            <Select 
              value={keyResult.owner}
              onValueChange={(value) => onChange(keyResult.id, "owner", value)}
            >
              <SelectTrigger id={`kr-owner-${keyResult.id}`}>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.full_name}>
                    {member.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={`kr-owner-${keyResult.id}`}
              value={keyResult.owner}
              onChange={(e) => onChange(keyResult.id, "owner", e.target.value)}
              placeholder="Name of the person responsible"
            />
          )}
        </div>
      </div>
    </div>
  );
};
