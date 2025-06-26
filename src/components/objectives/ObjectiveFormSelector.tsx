"use client";

import { useState } from "react";
import { SimpleObjectiveForm } from "./forms/SimpleObjectiveForm";
import { FlexibleObjectiveForm } from "./forms/FlexibleObjectiveForm";
import { AdvancedObjectiveForm } from "./forms/AdvancedObjectiveForm";
import { ValuesObjectiveForm } from "./forms/ValuesObjectiveForm";

export const ObjectiveFormSelector = () => {
  const [selectedType, setSelectedType] = useState<"simple" | "flexible" | "advanced" | "values">("simple");

  const handleSuccess = () => {
    // Handle success - you can add navigation or other logic here
    console.log("Objective created successfully");
  };

  return (
    <div>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as "simple" | "flexible" | "advanced" | "values")}>
        <option value="simple">Simple</option>
        <option value="flexible">Flexible</option>
        <option value="advanced">Advanced</option>
        <option value="values">Values</option>
      </select>

      {selectedType === "simple" && <SimpleObjectiveForm onSuccess={handleSuccess} />}
      {selectedType === "flexible" && <FlexibleObjectiveForm onSuccess={handleSuccess} />}
      {selectedType === "advanced" && <AdvancedObjectiveForm onSuccess={handleSuccess} />}
      {selectedType === "values" && <ValuesObjectiveForm onSuccess={handleSuccess} />}
    </div>
  );
};