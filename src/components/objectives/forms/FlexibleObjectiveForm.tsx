// src/components/objectives/forms/SimpleObjectiveForm.tsx
import { useState } from "react";
import { useCreateObjective } from "@/hooks/useCreateObjective";
import { Button } from "@/components/ui/button";
import { auth } from "@/integrations/firebase/firebase";

export const FlexibleObjectiveForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { createObjective } = useCreateObjective();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [baseline, setBaseline] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  
  const user = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createObjective({
      objective_type: "standard",
      title,
      description,
      baseline,
      target,
      current,
      personalObjective: true,
      user_id: user?.uid,
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input value={baseline} onChange={e => setBaseline(e.target.value)} placeholder="Baseline" />
      <input value={target} onChange={e => setTarget(e.target.value)} placeholder="Target" />
      <input value={current} onChange={e => setCurrent(e.target.value)} placeholder="Current" />
      <Button type="submit">Create</Button>
    </form>
  );
};