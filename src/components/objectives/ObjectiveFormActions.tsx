
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ObjectiveFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ObjectiveFormActions = ({ isSubmitting, onCancel }: ObjectiveFormActionsProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : "Create Objective"}
      </Button>
    </div>
  );
};
