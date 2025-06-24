
import { KeyResult } from "@/types/objectives";
import { KeyResultItem } from "./key-results/KeyResultItem";
import { NewKeyResultForm } from "./key-results/NewKeyResultForm";
import { useKeyResults } from "./key-results/useKeyResults";

interface KeyResultsFormProps {
  keyResults: KeyResult[];
  setKeyResults: React.Dispatch<React.SetStateAction<KeyResult[]>>;
  teamMembers?: { id: string; full_name: string }[];
}

export const KeyResultsForm = ({ 
  keyResults: externalKeyResults, 
  setKeyResults: setExternalKeyResults, 
  teamMembers = [] 
}: KeyResultsFormProps) => {
  const {
    keyResults,
    handleAddKeyResult,
    handleRemoveKeyResult,
    handleKeyResultChange
  } = useKeyResults(externalKeyResults);

  // Sync internal state with external state
  const syncKeyResults = (updatedKeyResults: KeyResult[]) => {
    setExternalKeyResults(updatedKeyResults);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Key Results</h3>
      </div>
      
      {keyResults.map((kr) => (
        <KeyResultItem
          key={kr.id}
          keyResult={kr}
          onRemove={(id) => {
            handleRemoveKeyResult(id);
            syncKeyResults(keyResults.filter(kr => kr.id !== id));
          }}
          onChange={(id, field, value) => {
            handleKeyResultChange(id, field, value);
            syncKeyResults(
              keyResults.map(kr => kr.id === id ? { ...kr, [field]: value } : kr)
            );
          }}
          teamMembers={teamMembers}
        />
      ))}
      
      <NewKeyResultForm 
        onAdd={(newKeyResult) => {
          handleAddKeyResult(newKeyResult);
          syncKeyResults([...keyResults, newKeyResult]);
        }}
        teamMembers={teamMembers}
      />
    </div>
  );
};
