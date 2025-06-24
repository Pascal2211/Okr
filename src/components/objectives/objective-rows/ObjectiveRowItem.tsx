
import { ObjectiveRow } from "@/types/objectives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ObjectiveRowItemProps {
  row: ObjectiveRow;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof ObjectiveRow, value: any) => void;
  teamMembers?: { id: string; full_name: string }[];
}

export const ObjectiveRowItem = ({ 
  row, 
  onRemove, 
  onChange, 
  teamMembers = [] 
}: ObjectiveRowItemProps) => {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex justify-between">
        <h4 className="font-medium">Row</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemove(row.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor={`row-title-${row.id}`}>Title</Label>
          <Input
            id={`row-title-${row.id}`}
            value={row.title}
            onChange={(e) => onChange(row.id, "title", e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`row-baseline-${row.id}`}>Baseline</Label>
            <Input
              id={`row-baseline-${row.id}`}
              type="number"
              value={row.baseline !== null ? row.baseline : ""}
              onChange={(e) => onChange(row.id, "baseline", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
          <div>
            <Label htmlFor={`row-current-${row.id}`}>Current</Label>
            <Input
              id={`row-current-${row.id}`}
              type="number"
              value={row.current !== null ? row.current : ""}
              onChange={(e) => onChange(row.id, "current", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
          <div>
            <Label htmlFor={`row-target-${row.id}`}>Target</Label>
            <Input
              id={`row-target-${row.id}`}
              type="number"
              value={row.target !== null ? row.target : ""}
              onChange={(e) => onChange(row.id, "target", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`row-comment-${row.id}`}>Comment</Label>
          <Input
            id={`row-comment-${row.id}`}
            value={row.comment}
            onChange={(e) => onChange(row.id, "comment", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor={`row-owner-${row.id}`}>Assigned to</Label>
          {teamMembers.length > 0 ? (
            <Select 
              value={row.owner}
              onValueChange={(value) => onChange(row.id, "owner", value)}
            >
              <SelectTrigger id={`row-owner-${row.id}`}>
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
              id={`row-owner-${row.id}`}
              value={row.owner}
              onChange={(e) => onChange(row.id, "owner", e.target.value)}
              placeholder="Name of the person responsible"
            />
          )}
        </div>
      </div>
    </div>
  );
};
