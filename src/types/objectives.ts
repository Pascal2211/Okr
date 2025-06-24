export interface Team {
    id: string;
    name: string;
    code: string;
  }
  
  export interface KeyResult {
    id: string;
    title: string;
    baseline: number | null;
    current: number | null;
    target: number | null;
    comment: string;
    owner: string;
    explanation?: string;
  }
  
  export interface Value {
    id: string;
    value: string;
    explanation: string;
  }
  
  export interface ObjectiveRow {
    id: string;
    title: string;
    baseline: number | null;
    current: number | null;
    target: number | null;
    comment: string;
    owner: string;
  }
  
  export interface Objective {
    id: string;
    personalObjective: boolean;
    title: string;
    description: string | null;
    keyResult?: string; // ← Accept snake_case if exists
    type: "standard" | "key_results" | "objective_rows" | "values";
    baseline?: number | null;
    current?: number | null;
    target?: number;
    owner?: string | null;
    deadline?: string | null;
    status?: "in_progress" | "completed" | null;
    team_id?: string | null;
    user_id?: string | null;
    key_results?: KeyResult[];
    objective_rows?: ObjectiveRow[];
    values?: Value[];
    comment?: string | null;
    created_at?: string;
  }
  