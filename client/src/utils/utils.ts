import { Todo, TodoGroups } from "../types/types";

export const formatDate = (todo: Todo): string => {
  if (todo.month && todo.year) {
    return `${todo.month}/${todo.year.slice(-2)}`;
  } else {
    return 'No Due Date';
  }
}

export const sortList = (todos: Todo[]): Todo[] => {
  // return todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0) ||
  //                              a.id - b.id);
  return todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
}

export const generateTodoGroups = (todos: Todo[]): TodoGroups[] => {
  const result: TodoGroups[] = [];

  todos.forEach(todo => {
    const existingGroup = result.find(current => current.date === formatDate(todo))
    if (existingGroup) {
      existingGroup.total += 1;
      existingGroup.totalCompleted += todo.completed ? 1 : 0;
      existingGroup.todos.push(todo);
    } else {
      result.push({
        date: formatDate(todo),
        total: 1,
        totalCompleted: todo.completed ? 1 : 0,
        todos: [todo],
      })
    }
  })

  return sortTodoGroups(result);
}

export const totalCompletedTodos = (todos: Todo[]): number => {
  return todos.reduce((acc, curr) => {
    return acc + (curr.completed ? 1 : 0);
  }, 0)
}

const sortTodoGroups = (groups: TodoGroups[]): TodoGroups[] => {
  return groups.sort((a, b) => {
    if (a.date === 'No Due Date') return -1;
    if (b.date === 'No Due Date') return 1;

    const aMonth = parseInt(a.date.slice(0, 3), 10);
    const bMonth = parseInt(b.date.slice(0, 3), 10);
    const aYear = parseInt(a.date.slice(-2), 10);
    const bYear = parseInt(b.date.slice(-2), 10);

    if (aYear !== bYear) {
      return aYear - bYear;
    }

    return bMonth - aMonth;
  })
}

export const cleanTodo = (todo: Todo): Omit<Todo, 'isNew' | 'isSaving' | 'tempId' | 'hasError'> => {
  const cleaned = { ...todo };
  delete cleaned.isNew;
  delete cleaned.isSaving;
  delete cleaned.tempId;
  delete cleaned.hasError;

  return cleaned;
};
