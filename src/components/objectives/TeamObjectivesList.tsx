import { useEffect, useState } from "react";
import { ObjectivesList } from "./ObjectivesList";
import { Loader2 } from "lucide-react";
import { useObjectiveOperations } from "@/hooks/useObjectiveOperations";
import { Objective } from "@/types/objectives";

interface TeamObjectivesListProps {
  teamId: string;
}

export const TeamObjectivesList = ({ teamId }: TeamObjectivesListProps) => {
  const { fetchObjectives } = useObjectiveOperations();
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchObjectives(teamId);
      setObjectives(data);
      setLoading(false);
    };
    load();
  }, [teamId]);

  if (loading) {
    return <div className="flex justify-center items-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return <ObjectivesList objectives={objectives} />;
} 