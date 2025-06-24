import { useState } from "react";
import { SimpleObjectiveForm } from "./SimpleObjectiveForm";
import { ValuesObjectiveForm } from "./ValuesObjectiveForm";
import { Button } from "@/components/ui/button";

export const ObjectivesFormRouter = () => {
  const [type, setType] = useState<"standard" | "values" | "key_results" | "objective_rows" | null>(null);

  if (!type) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setType("standard")}>Objective</Button>
          <Button onClick={() => setType("values")}>Values 2</Button>
          <Button onClick={() => setType("key_results")}>Flexible</Button>
          <Button onClick={() => setType("objective_rows")}>Advanced</Button>
        </div>
      </div>
    );
  }

  // Show 'Not ready' for Flexible and Advanced
  if (type === "key_results" || type === "objective_rows") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <h2 className="text-2xl font-bold text-center text-black">Not ready</h2>
        <Button className="text-black" variant="ghost" onClick={() => setType(null)}>← Go back</Button>
      </div>
    );
  }

  return (
    <div>
      {type === "standard" && (
        <SimpleObjectiveForm 
          onSuccess={() => setType(null)}
        />
      )}
      {type === "values" && <ValuesObjectiveForm onSuccess={() => setType(null)} />}
      <Button variant="ghost" onClick={() => setType(null)}>← Go back</Button>
    </div>
  );
};