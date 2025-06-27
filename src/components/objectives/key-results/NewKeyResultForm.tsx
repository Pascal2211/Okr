
import { useState } from "react";
import { KeyResult } from "@/types/objectives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewKeyResultFormProps {
  onAdd: (keyResult: KeyResult) => void;
  teamMembers?: { id: string; full_name: string }[];
}

export const NewKeyResultForm = ({ onAdd, teamMembers = [] }: NewKeyResultFormProps) => {
  const [newKeyResult, setNewKeyResult] = useState<KeyResult>({
    id: Math.random().toString(),
    title: "",
    baseline: null,
    current: null,
    target: null,
    comment: "",
    owner: "",
    keyResult: "",
  });

  const handleAddKeyResult = () => {
    if (!newKeyResult.title) return;
    
    onAdd({ ...newKeyResult, id: Math.random().toString() });
    setNewKeyResult({
      id: Math.random().toString(),
      title: "",
      baseline: null,
      current: null,
      target: null,
      comment: "",
      owner: "",
      keyResult: ""
    });
  };

  return (
    <div className="p-4 border border-dashed rounded-lg space-y-3">
      <h4 className="font-medium">Add New Key Result</h4>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="new-kr-title">Title</Label>
          <Input
            id="new-kr-title"
            value={newKeyResult.title}
            onChange={(e) => setNewKeyResult({...newKeyResult, title: e.target.value})}
            placeholder="Enter key result title"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="new-kr-baseline">Baseline</Label>
            <Input
              id="new-kr-baseline"
              type="number"
              value={newKeyResult.baseline !== null ? newKeyResult.baseline : ""}
              onChange={(e) => setNewKeyResult({...newKeyResult, baseline: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Starting value"
            />
          </div>
          <div>
            <Label htmlFor="new-kr-current">Current</Label>
            <Input
              id="new-kr-current"
              type="number"
              value={newKeyResult.current !== null ? newKeyResult.current : ""}
              onChange={(e) => setNewKeyResult({...newKeyResult, current: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Current value"
            />
          </div>
          <div>
            <Label htmlFor="new-kr-target">Target</Label>
            <Input
              id="new-kr-target"
              type="number"
              value={newKeyResult.target !== null ? newKeyResult.target : ""}
              onChange={(e) => setNewKeyResult({...newKeyResult, target: e.target.value ? parseFloat(e.target.value) : null})}
              placeholder="Goal value"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="new-kr-comment">Comment</Label>
          <Input
            id="new-kr-comment"
            value={newKeyResult.comment}
            onChange={(e) => setNewKeyResult({...newKeyResult, comment: e.target.value})}
            placeholder="Additional details"
          />
        </div>
        
        <div>
          <Label htmlFor="new-kr-owner">Assigned to</Label>
          {teamMembers.length > 0 ? (
            <Select 
              value={newKeyResult.owner}
              onValueChange={(value) => setNewKeyResult({...newKeyResult, owner: value})}
            >
              <SelectTrigger id="new-kr-owner">
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
              id="new-kr-owner"
              value={newKeyResult.owner}
              onChange={(e) => setNewKeyResult({...newKeyResult, owner: e.target.value})}
              placeholder="Name of the person responsible"
            />
          )}
        </div>
        
        <Button 
          type="button" 
          onClick={handleAddKeyResult}
          disabled={!newKeyResult.title}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Key Result
        </Button>
      </div>
    </div>
  );
};
