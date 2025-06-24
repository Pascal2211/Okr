// src/components/objectives/ObjectiveCreator.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { ObjectivesFormRouter } from "./forms/ObjectiveFormRouter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export const ObjectiveCreator = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New Objective
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-4xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-8 shadow-lg sm:rounded-xl">
        <DialogTitle className="text-2xl font-semibold text-black text-center">Choose Objective type</DialogTitle> 
          <ObjectivesFormRouter />
        </DialogContent>
      </Dialog>
    </>
  );
};