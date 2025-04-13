import React, { JSX } from 'react';
import { Todo as TodoType } from '../types/types';
import { remove, update } from '../services/todos';
import { formatDate, sortList, cleanTodo } from '../utils/utils';

interface TodoProps {
  todo: TodoType
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  setTodo: React.Dispatch<React.SetStateAction<TodoType>>
  todosToShow: TodoType[]
  setTodosToShow: React.Dispatch<React.SetStateAction<TodoType[]>>
  group: {
    name: string;
    completed: boolean;
  }
}

const Todo: React.FC<TodoProps> = ({ todos, setTodos, todo, setTodo, todosToShow, setTodosToShow, group }): JSX.Element => {
  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      if (todo.id) {
        remove(todo.id);
      }
      setTodos(todos.filter(t => t.id !== todo.id));
      setTodosToShow(todosToShow.filter(t => t.id !== todo.id));
    }
  }

  const handleMarkAsCompleted = async (e: React.MouseEvent): Promise<void> => {
      e.preventDefault();

      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      if (!todo.id && todo.tempId) {
        const updated = { ...updatedTodo };
        setTodos(prev => prev.map(t => (t.tempId === todo.tempId ? updated : t)));
        setTodosToShow(prev =>
          sortList(prev.map(t => (t.tempId === todo.tempId ? updated : t)))
        );
        return;
      }

      if (!todo.id) {
        alert('Cannot mark as complete as item has not been created yet!');
        return;
      }

      const savingTodo = { ...updatedTodo, isSaving: true };
      setTodos(prev => prev.map(t => (t.id === todo.id ? savingTodo : t)));
      setTodosToShow(prev => prev.map(t => (t.id === todo.id ? savingTodo : t)));

      await update(cleanTodo(updatedTodo));

      const updated = { ...updatedTodo, isSaving: false };
      setTodos(prev => {
        const updatedTodos = prev.map(t => (t.id === todo.id ? updated : t));
        const filteredTodos = updatedTodos.filter(t => formatDate(t) === group.name);
        setTodosToShow(sortList(group.name === 'All Todos' ? updatedTodos : filteredTodos));
        return updatedTodos;
      });
    };

  const openModal = (): void => {
    const modalLayer = document.getElementById('modal_layer') as HTMLElement;
    const modalForm = document.getElementById('form_modal') as HTMLElement;

    modalLayer.style.display = 'block';
    modalForm.style.display = 'block';
  }

  const handleOpenTodoForm = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    setTodo(todo);
    openModal();
  }

  return (
    <>
    <tr id={`table-todo-${String(todo.id)}`}>
      <td className="list_item" onClick={handleMarkAsCompleted}>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
        <span className="check"></span>
        <label
          onClick={handleOpenTodoForm}
        >
          {todo.title} - {formatDate(todo)}
        </label>
      </td>
      <td className="delete" onClick={handleDelete}>
        <img src="src/assets/images/trash.png" alt="Delete"/>
      </td>
    </tr>
    </>
  )
}

export default Todo;