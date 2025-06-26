"use client";

import { useEffect } from "react";
import { useObjectives } from "@/hooks/useObjectives";
import { ObjectivesList } from "./ObjectivesList";

export const ObjectiveDisplayList = () => {
  const { objectives, fetchObjectives } = useObjectives();

  useEffect(() => {
    fetchObjectives(null);
  }, [fetchObjectives]);

  return <ObjectivesList objectives={objectives} />;
};