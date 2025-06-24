// src/components/objectives/forms/SimpleObjectiveForm.tsx
import { useState } from "react";
import { useCreateObjective } from "@/hooks/useCreateObjective";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/integrations/firebase/firebase";

export const ValuesObjectiveForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { createObjective } = useCreateObjective();
  const [title, setTitle] = useState("");
  const [values, setValues] = useState([{ value: "", explanation: "" }]);
  const user = auth.currentUser;

  const handleValueChange = (idx: number, field: "value" | "explanation", val: string) => {
    setValues(prev => prev.map((v, i) => i === idx ? { ...v, [field]: val } : v));
  };

  const handleAddRow = () => {
    setValues(prev => [...prev, { value: "", explanation: "" }]);
  };

  const handleRemoveRow = (idx: number) => {
    setValues(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createObjective({
      type: "values",
      title,
      values,
      personalObjective: true,
      user_id: user?.uid,
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-black pt-6 max-w-2xl mx-auto">
      <div>
        <Label>Main Title</Label>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="bg-white text-black placeholder:text-gray-500"
          placeholder="E.g. Company Values"
        />
      </div>
      <div className="space-y-4">
        {values.map((row, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 items-start border rounded-lg p-4 bg-gray-50">
            <div className="flex-1 w-full">
              <Label>Value Title</Label>
              <Input
                value={row.value}
                onChange={e => handleValueChange(idx, "value", e.target.value)}
                required
                className="bg-white text-black placeholder:text-gray-500"
                placeholder="E.g. Quality and Simplicity"
              />
            </div>
            <div className="flex-1 w-full">
              <Label>Explanation</Label>
              <Textarea
                value={row.explanation}
                onChange={e => handleValueChange(idx, "explanation", e.target.value)}
                required
                className="bg-white text-black placeholder:text-gray-500 min-h-[60px]"
                placeholder="E.g. Why is this value important?"
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button type="button" variant="destructive" className="mt-6" onClick={() => handleRemoveRow(idx)} disabled={values.length === 1}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={handleAddRow} className="w-full md:w-auto">+ Add Value</Button>
      </div>
      <Button type="submit" className="w-full">Create Values Set</Button>
    </form>
  );
};