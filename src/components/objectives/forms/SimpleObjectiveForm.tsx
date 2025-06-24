"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateObjective } from "@/hooks/useCreateObjective";
import { auth } from "@/integrations/firebase/firebase";
import { useObjectiveContext } from "@/contexts/ObjectiveContext";

interface KeyResult {
  name: string;
  keyResult: string;
  explanation: string;
  baseline: string;
  current: string;
  target: string;
  owner: string;
}

interface SimpleObjectiveFormProps {
  isSubmitting?: boolean;
  onSuccess?: () => void;
}

export const SimpleObjectiveForm = ({
  isSubmitting = false,
  onSuccess,
}: SimpleObjectiveFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [comment, setComment] = useState("");
  const [keyResults, setKeyResults] = useState<KeyResult[]>([
    {
      name: "",
      keyResult: "",
      explanation: "",
      baseline: "",
      current: "",
      target: "",
      owner: "",
    },
  ]);

  const { createObjective } = useCreateObjective();
  const { isTeamTab } = useObjectiveContext();

  const handleAddKeyResult = () => {
    setKeyResults([
      ...keyResults,
      {
        name: "",
        keyResult: "",
        explanation: "",
        baseline: "",
        current: "",
        target: "",
        owner: "",
      },
    ]);
  };

  const handleKeyResultChange = (
    index: number,
    field: keyof KeyResult,
    value: string
  ) => {
    const updated = [...keyResults];
    updated[index][field] = value;
    setKeyResults(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    const payload = {
      title,
      description,
      owner,
      comment,
      type: "standard",
      key_results: keyResults,
      user_id: user?.uid,
    };

    const newId = await createObjective(payload);
    if (newId) {
      // Reset form
      setTitle("");
      setDescription("");
      setOwner("");
      setComment("");
      setKeyResults([{
        name: "",
        keyResult: "",
        explanation: "",
        baseline: "",
        current: "",
        target: "",
        owner: "",
      }]);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black pt-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          Creating a <strong>{isTeamTab ? 'team' : 'personal'}</strong> objective
        </p>
      </div>

      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-white text-black placeholder:text-gray-500"
          placeholder="Write your objective title"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-white text-black placeholder:text-gray-500"
          placeholder="Describe the purpose of this objective"
        />
      </div>

      <div>
        <Label>Owner</Label>
        <Input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="bg-white text-black placeholder:text-gray-500"
          placeholder="Owner name"
        />
      </div>

      <div>
        <Label>Comment</Label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-white text-black placeholder:text-gray-500"
          placeholder="Additional comments (optional)"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Key Results</h3>
        {keyResults.map((kr, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md"
          >
            <div>
              <Label>Key Result Name</Label>
              <Input 
              value={kr.name}
              onChange={(e) => 
                handleKeyResultChange(index, "name", e.target.value)}
                className="bg-white text-black placeholder:text-gray-500 font-semibold"
                placeholder="E.g Enable offline charging"/> 
            </div>
            <div>
              <Label>Key Result</Label>
              <Input
                value={kr.keyResult}
                onChange={(e) =>
                  handleKeyResultChange(index, "keyResult", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
                placeholder="E.g Facility Uptime"
              />
            </div>
            <div>
              <Label>Explanation</Label>
              <Input
                value={kr.explanation}
                onChange={(e) =>
                  handleKeyResultChange(index, "explanation", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
                placeholder="Why is this important?"
              />
            </div>
            <div>
              <Label>Baseline</Label>
              <Input
                type="number"
                value={kr.baseline}
                onChange={(e) =>
                  handleKeyResultChange(index, "baseline", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label>Current</Label>
              <Input
                type="number"
                value={kr.current}
                onChange={(e) =>
                  handleKeyResultChange(index, "current", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label>Target</Label>
              <Input
                type="number"
                value={kr.target}
                onChange={(e) =>
                  handleKeyResultChange(index, "target", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label>Owner</Label>
              <Input
                value={kr.owner}
                onChange={(e) =>
                  handleKeyResultChange(index, "owner", e.target.value)
                }
                className="bg-white text-black placeholder:text-gray-500"
                placeholder="Key result owner"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={handleAddKeyResult}
          className="w-full"
        >
          Add Key Result
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : `Create ${isTeamTab ? 'Team' : 'Personal'} Objective`}
      </Button>
    </form>
  );
};
