
import { ObjectiveRow } from "@/types/objectives";
import { ObjectiveRowItem } from "./objective-rows/ObjectiveRowItem";
import { NewObjectiveRowForm } from "./objective-rows/NewObjectiveRowForm";
import { useObjectiveRows } from "./objective-rows/useObjectiveRows";

interface ObjectiveRowsFormProps {
  objectiveRows: ObjectiveRow[];
  setObjectiveRows: React.Dispatch<React.SetStateAction<ObjectiveRow[]>>;
  teamMembers?: { id: string; full_name: string }[];
}

export const ObjectiveRowsForm = ({ 
  objectiveRows, 
  setObjectiveRows,
  teamMembers = []
}: ObjectiveRowsFormProps) => {
  const {
    handleAddRow,
    handleRemoveRow,
    handleRowChange
  } = useObjectiveRows(objectiveRows);

  // Ensure parent component's state is updated when our internal state changes
  const handleAddRowWithUpdate = (newRow: ObjectiveRow) => {
    handleAddRow(newRow);
    // The hook has already updated its internal state, so we need to manually sync
    setObjectiveRows(prev => [...prev, { ...newRow, id: Math.random().toString() }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Objective Rows</h3>
      </div>
      
      {objectiveRows.map((row) => (
        <ObjectiveRowItem
          key={row.id}
          row={row}
          onRemove={(id) => {
            handleRemoveRow(id);
            setObjectiveRows(objectiveRows.filter(r => r.id !== id));
          }}
          onChange={(id, field, value) => {
            handleRowChange(id, field, value);
            setObjectiveRows(
              objectiveRows.map(r => 
                r.id === id ? { ...r, [field]: value } : r
              )
            );
          }}
          teamMembers={teamMembers}
        />
      ))}
      
      <NewObjectiveRowForm 
        onAdd={handleAddRowWithUpdate}
        teamMembers={teamMembers}
      />
    </div>
  );
};
