"use client";

import { useState } from "react";
import { SimpleObjectiveForm } from "./forms/SimpleObjectiveForm";
import { FlexibleObjectiveForm } from "./forms/FlexibleObjectiveForm";
import { AdvancedObjectiveForm } from "./forms/AdvancedObjectiveForm";
import { ValuesObjectiveForm } from "./forms/ValuesObjectiveForm";

export const ObjectiveFormSelector = () => {
  const [selectedType, setSelectedType] = useState<"simple" | "flexible" | "advanced" | "values">("simple");

  return (
    <div>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as any)}>
        <option value="simple">Simple</option>
        <option value="flexible">Flexible</option>
        <option value="advanced">Advanced</option>
        <option value="values">Values</option>
      </select>

      {selectedType === "simple" && <SimpleObjectiveForm />}
      {selectedType === "flexible" && <FlexibleObjectiveForm />}
      {selectedType === "advanced" && <AdvancedObjectiveForm />}
      {selectedType === "values" && <ValuesObjectiveForm />}
    </div>
  );
};