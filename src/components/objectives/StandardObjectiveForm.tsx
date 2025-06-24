
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface StandardObjectiveFormProps {
  formData: {
    title: string;
    description: string;
    keyResult: string;
    baseline: string;
    target: string;
    owner: string;
    deadline: string;
    comment: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    keyResult: string;
    baseline: string;
    target: string;
    owner: string;
    deadline: string;
    comment: string;
  }>>;
}

export const StandardObjectiveForm = ({ formData, setFormData }: StandardObjectiveFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="keyResult">Key Result</Label>
        <Input
          id="keyResult"
          value={formData.keyResult}
          onChange={(e) => setFormData({...formData, keyResult: e.target.value})}
          required
          placeholder="E.g., Increase revenue by 20%"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="baseline">Baseline</Label>
          <Input
            id="baseline"
            type="number"
            value={formData.baseline}
            onChange={(e) => setFormData({...formData, baseline: e.target.value})}
            placeholder="Starting value"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input
            id="target"
            type="number"
            value={formData.target}
            onChange={(e) => setFormData({...formData, target: e.target.value})}
            required
            placeholder="Goal value"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          placeholder="Additional information about this objective"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="owner">Owner</Label>
        <Input
          id="owner"
          value={formData.owner}
          onChange={(e) => setFormData({...formData, owner: e.target.value})}
          placeholder="Who's responsible?"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
        />
      </div>
    </>
  );
};
