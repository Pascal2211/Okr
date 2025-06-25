import { Objective } from "@/types/objectives";

const calculateSimpleProgress = (current: number, target: number, baseline: number = 0): number => {
  if (target === baseline) {
    return current >= target ? 100 : 0;
  }
  const progress = ((current - baseline) / (target - baseline)) * 100;
  return Math.max(0, Math.min(progress, 100)); // Clamped between 0 and 100
};

export const calculateObjectiveProgress = (objective: Objective): number => {
  // Priority 1: If key_results exist, use them for progress.
  if (objective.key_results && objective.key_results.length > 0) {
    const totalProgress = objective.key_results.reduce((sum, kr) => {
      // Safely parse string values from Firebase to numbers
      const baseline = parseFloat(String(kr.baseline)) || 0;
      const current = parseFloat(String(kr.current)) || 0;
      const target = parseFloat(String(kr.target)) || 0;
      
      const progress = calculateSimpleProgress(current, target, baseline);
      return sum + progress;
    }, 0);
    return totalProgress / objective.key_results.length;
  }

  // Priority 2: Fallback for 'standard' objectives without key results.
  if (objective.current != null && objective.target != null) {
    const baseline = parseFloat(String(objective.baseline)) || 0;
    const current = parseFloat(String(objective.current)) || 0;
    const target = parseFloat(String(objective.target)) || 0;
    return calculateSimpleProgress(current, target, baseline);
  }
  
  // Default: If no progress can be calculated, return 0.
  return 0;
}; 