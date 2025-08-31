export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  difficulty: number;
}

export type FilterType = "all" | "active" | "completed";
