export interface Category {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  categoryId: number;
}
