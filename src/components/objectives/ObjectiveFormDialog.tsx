
import { useEffect } from "react";
import { Team, KeyResult, Value, ObjectiveRow } from "@/types/objectives";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StandardObjectiveForm } from "./StandardObjectiveForm";
import { KeyResultsForm } from "./KeyResultsForm";
import { ObjectiveRowsForm } from "./ObjectiveRowsForm";
import { ValuesForm } from "./ValuesForm";
import { ObjectiveTypeSelector } from "./ObjectiveTypeSelector";
import { ObjectiveFormHeader } from "./ObjectiveFormHeader";
import { TeamSelector } from "./TeamSelector";
import { OwnerSelector } from "./OwnerSelector";
import { ObjectiveFormActions } from "./ObjectiveFormActions";
import { useTeamMembers } from "./useTeamMembers";

interface ObjectiveFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  objectiveType: "standard" | "key_results" | "objective_rows" | "values";
  setObjectiveType: React.Dispatch<React.SetStateAction<"standard" | "key_results" | "objective_rows" | "values">>;
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
  keyResults: KeyResult[];
  setKeyResults: React.Dispatch<React.SetStateAction<KeyResult[]>>;
  objectiveRows: ObjectiveRow[];
  setObjectiveRows: React.Dispatch<React.SetStateAction<ObjectiveRow[]>>;
  values: Value[];
  setValues: React.Dispatch<React.SetStateAction<Value[]>>;
  resetForm: () => void;
  teams: Team[];
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ObjectiveFormDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  objectiveType,
  setObjectiveType,
  formData,
  setFormData,
  keyResults,
  setKeyResults,
  objectiveRows,
  setObjectiveRows,
  values,
  setValues,
  resetForm,
  teams,
  selectedTeam,
  setSelectedTeam
}: ObjectiveFormDialogProps) => {
  const { teamMembers, currentUserFullName, setCurrentUserFullName } = useTeamMembers(selectedTeam);

  // Set owner to current user by default if empty
  useEffect(() => {
    if (currentUserFullName && !formData.owner) {
      setFormData(prev => ({ ...prev, owner: currentUserFullName }));
    }
  }, [currentUserFullName, formData.owner, setFormData]);

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl" aria-describedby="Objective-dialog-description">
        <DialogHeader>
          <DialogTitle>
            Create New {selectedTeam ? "Team" : "Personal"} Objective
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1 text-black">
            <ObjectiveTypeSelector 
              objectiveType={objectiveType} 
              setObjectiveType={setObjectiveType} 
            />
            
            <ObjectiveFormHeader 
              formData={formData} 
              setFormData={setFormData} 
            />
            
            {objectiveType === "standard" && (
              <>
                <StandardObjectiveForm 
                  formData={formData} 
                  setFormData={setFormData} 
                />
                
                {/* Owner selection field */}
                <OwnerSelector
                  formData={formData}
                  setFormData={setFormData}
                  currentUserFullName={currentUserFullName}
                  teamMembers={selectedTeam ? teamMembers : []}
                />
              </>
            )}
            
            {objectiveType === "key_results" && (
              <KeyResultsForm 
                keyResults={keyResults} 
                setKeyResults={setKeyResults} 
                teamMembers={selectedTeam ? teamMembers : []}
              />
            )}
            
            {objectiveType === "objective_rows" && (
              <ObjectiveRowsForm 
                objectiveRows={objectiveRows} 
                setObjectiveRows={setObjectiveRows}
                teamMembers={selectedTeam ? teamMembers : []}
              />
            )}
            
            {objectiveType === "values" && (
              <ValuesForm values={values} setValues={setValues} />
            )}
            
            <TeamSelector 
              teams={teams} 
              selectedTeam={selectedTeam} 
              setSelectedTeam={setSelectedTeam} 
            />
          </div>
          
          <ObjectiveFormActions 
            isSubmitting={isSubmitting} 
            onCancel={handleCancel} 
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
