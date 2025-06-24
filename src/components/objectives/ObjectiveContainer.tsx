import { useEffect, useState } from "react";
import { ObjectivesList } from "./ObjectivesList";
import { useObjectiveOperations } from "@/hooks/useObjectiveOperations";
import { EmptyObjectives } from "./EmptyObjectives";
import { Loader2 } from "lucide-react";
import { PersonalObjectivesList } from "./PersonalObjectivesList";
import { TeamObjectivesList } from "./TeamObjectivesList";

interface ObjectivesContainerProps {
  teamId?: string | null;
}

export const ObjectivesContainer = ({ teamId }: ObjectivesContainerProps) => {
  const { fetchObjectives } = useObjectiveOperations();
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadObjectives = async () => {
      setLoading(true);
      console.log("[ObjectiveContainer] teamId:", teamId);
      const data = await fetchObjectives(teamId ?? null);
      setObjectives(data)
      setLoading(false);
      console.log("[ObjectiveContainer] objectives fetched:", data);
    };
    loadObjectives();
  }, [teamId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  console.log("Objectives to render:", objectives);
  return objectives.length > 0 ? (
    <ObjectivesList objectives={objectives} />
  ) : (
    <EmptyObjectives />
  );
};