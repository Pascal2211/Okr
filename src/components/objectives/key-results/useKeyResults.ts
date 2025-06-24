
import { useState } from "react";
import { KeyResult } from "@/types/objectives";

export const useKeyResults = (initialKeyResults: KeyResult[] = []) => {
  const [keyResults, setKeyResults] = useState<KeyResult[]>(initialKeyResults);

  const handleAddKeyResult = (newKeyResult: KeyResult) => {
    setKeyResults([...keyResults, newKeyResult]);
  };

  const handleRemoveKeyResult = (id: string) => {
    setKeyResults(keyResults.filter((kr) => kr.id !== id));
  };

  const handleKeyResultChange = (id: string, field: keyof KeyResult, value: any) => {
    setKeyResults(
      keyResults.map((kr) =>
        kr.id === id ? { ...kr, [field]: value } : kr
      )
    );
  };

  return {
    keyResults,
    setKeyResults,
    handleAddKeyResult,
    handleRemoveKeyResult,
    handleKeyResultChange
  };
};
