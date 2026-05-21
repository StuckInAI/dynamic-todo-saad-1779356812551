export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
};

export type FilterType = 'all' | 'active' | 'completed';
