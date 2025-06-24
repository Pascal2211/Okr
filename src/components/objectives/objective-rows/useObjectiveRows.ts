
import { useState } from "react";
import { ObjectiveRow } from "@/types/objectives";

export const useObjectiveRows = (initialObjectiveRows: ObjectiveRow[] = []) => {
  const [objectiveRows, setObjectiveRows] = useState<ObjectiveRow[]>(initialObjectiveRows);

  const handleAddRow = (newRow: ObjectiveRow) => {
    if (!newRow.title) return;
    
    setObjectiveRows([...objectiveRows, { ...newRow, id: Math.random().toString() }]);
  };

  const handleRemoveRow = (id: string) => {
    setObjectiveRows(objectiveRows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id: string, field: keyof ObjectiveRow, value: any) => {
    setObjectiveRows(
      objectiveRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return {
    objectiveRows,
    setObjectiveRows,
    handleAddRow,
    handleRemoveRow,
    handleRowChange
  };
};
