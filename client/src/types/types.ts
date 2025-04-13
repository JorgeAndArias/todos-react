export interface Todo {
  id?: number
  tempId?: string
  title: string
  day?: string
  month?: string
  year?: string
  completed: boolean
  description?: string
  isNew?: boolean
  [key: string]: string | number | boolean | undefined
}

export type NewTodo = Omit<Todo, "id" | "completed">;

export type UpdateTodo = Pick<Todo, "id"> & Partial<Omit<Todo, "id">>;

export interface TodoGroups {
  date: string,
  total: number,
  totalCompleted: number,
  todos: Todo[],
}
