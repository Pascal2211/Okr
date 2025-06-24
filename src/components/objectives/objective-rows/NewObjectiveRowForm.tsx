
import { useState } from "react";
import { ObjectiveRow } from "@/types/objectives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewObjectiveRowFormProps {
  onAdd: (newRow: ObjectiveRow) => void;
  teamMembers?: { id: string; full_name: string }[];
}

export const NewObjectiveRowForm = ({ onAdd, teamMembers = [] }: NewObjectiveRowFormProps) => {
  const [newRow, setNewRow] = useState<ObjectiveRow>({
    id: Math.random().toString(),
    title: "",
    baseline: null,
    current: null,
    target: null,
    comment: "",
    owner: "",
  });

  const handleAddRow = () => {
    if (!newRow.title) return;
    
    onAdd({ ...newRow });
    setNewRow({
      id: Math.random().toString(),
      title: "",
      baseline: null,
      current: null,
      target: null,
      comment: "",
      owner: "",
    });
  };

  return (
    <div className="p-4 border border-dashed rounded-lg space-y-3">
      <h4 className="font-medium">Add New Row</h4>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="new-row-title">Title</Label>
          <Input
            id="new-row-title"
            value={newRow.title}
            onChange={(e) => setNewRow({...newRow, title: e.target.value})}
            placeholder="Enter row title"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="new-row-baseline">Baseline</Label>
            <Input
              id="new-row-baseline"
              type="number"
              value={newRow.baseline !== null ? newRow.baseline : ""}
              onChange={(e) => setNewRow({...newRow, baseline: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Starting value"
            />
          </div>
          <div>
            <Label htmlFor="new-row-current">Current</Label>
            <Input
              id="new-row-current"
              type="number"
              value={newRow.current !== null ? newRow.current : ""}
              onChange={(e) => setNewRow({...newRow, current: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Current value"
            />
          </div>
          <div>
            <Label htmlFor="new-row-target">Target</Label>
            <Input
              id="new-row-target"
              type="number"
              value={newRow.target !== null ? newRow.target : ""}
              onChange={(e) => setNewRow({...newRow, target: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Goal value"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="new-row-comment">Comment</Label>
          <Input
            id="new-row-comment"
            value={newRow.comment}
            onChange={(e) => setNewRow({...newRow, comment: e.target.value})}
            placeholder="Additional details"
          />
        </div>
        
        <div>
          <Label htmlFor="new-row-owner">Assigned to</Label>
          {teamMembers.length > 0 ? (
            <Select 
              value={newRow.owner}
              onValueChange={(value) => setNewRow({...newRow, owner: value})}
            >
              <SelectTrigger id="new-row-owner">
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
              id="new-row-owner"
              value={newRow.owner}
              onChange={(e) => setNewRow({...newRow, owner: e.target.value})}
              placeholder="Name of the person responsible"
            />
          )}
        </div>
        
        <Button 
          type="button" 
          onClick={handleAddRow}
          disabled={!newRow.title}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
      </div>
    </div>
  );
};
