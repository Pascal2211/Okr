"use client";

import { useObjectives } from "@/hooks/useObjectives";
import { ObjectiveCard } from "./ObjectiveCard";

export const ObjectiveDisplayList = () => {
  const { objectives, fetchObjectives } = useObjectives();

  useEffect(() => {
    fetchObjectives();
  }, []);

  return (
    <div>
      {objectives.map((obj) => (
        <ObjectiveCard key={obj.id} objective={obj} />
      ))}
    </div>
  );
};