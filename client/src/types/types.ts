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
// type NumberMonth =
//   | "01"
//   | "02"
//   | "03"
//   | "04"
//   | "05"
//   | "06"
//   | "07"
//   | "08"
//   | "09"
//   | "10"
//   | "11"
//   | "12";

// type Year = `${number}${number}`;
// type DueDate = `${NumberMonth}/${Year}` | "No Due Date";

// export interface SelectedGroup {
//   name: "all" | DueDate
//   // total: number
//   completed: boolean
// }