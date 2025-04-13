import React, { JSX } from 'react';
import { Todo } from '../types/types';
import { createTodo, update } from '../services/todos';
import { formatDate, sortList, cleanTodo } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface ModalProps {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  todo: Todo
  setTodo: React.Dispatch<React.SetStateAction<Todo>>
  setTodosToShow: React.Dispatch<React.SetStateAction<Todo[]>>
  group: {
    name: string
    completed: boolean
  }
  setGroup: React.Dispatch<React.SetStateAction<{
    name: string
    completed: boolean
  }>>
}

interface FormProps {
  id: string;
  name: string;
  defaultOption: string;
  options: (string | { value: string; name: string })[];
  handleChange: (event: React.ChangeEvent<FormElement>) => void;
  todo: Todo;
}

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 12 }, (_, i) => currentYear + i);
const months = [
  { value: '01', name: 'January' },
  { value: '02', name: 'February' },
  { value: '03', name: 'March' },
  { value: '04', name: 'April' },
  { value: '05', name: 'May' },
  { value: '06', name: 'June' },
  { value: '07', name: 'July' },
  { value: '08', name: 'August' },
  { value: '09', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' },
];

const Select: React.FC<FormProps> = ({ id, name, defaultOption, options, handleChange, todo }) => (
  <select id={id} name={name} value={todo[name] === '' ? defaultOption : (todo[name] as string)} onChange={handleChange}>
    <option>{defaultOption}</option>
    {options.map((option) =>
      typeof option === 'object' ? (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ) : (
        <option key={option} value={option}>
          {option}
        </option>
      )
    )}
  </select>
);

const generateID = (): string => uuidv4();

const Modal: React.FC<ModalProps> = ({
  todos,
  setTodos,
  todo,
  setTodo,
  setTodosToShow,
  group,
  setGroup,
}): JSX.Element => {
  const handleSaveForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (todo.title.length < 4) {
      alert('You must enter a title at least 3 characters long.');
      return;
    }

    const updatedTodo = {
      ...todo,
      day: todo.day === 'Day' ? '' : todo.day,
      month: todo.month === 'Month' ? '' : todo.month,
      year: todo.year === 'Year' ? '' : todo.year,
    };

    if (!todo.id && !todo.tempId) {
      const tempId = generateID();
      const newTodo = {
        ...updatedTodo,
        tempId,
        isNew: true,
        isSaving: true,
      };

      setTodo(newTodo);
      setTodos(prev => [...prev, newTodo]);
      setTodosToShow(prev => [...prev, newTodo]);

      const created = await createTodo(cleanTodo(updatedTodo));

      const sorted = sortList([
        ...todos.filter(t => t.tempId !== tempId),
        created,
      ]);

      setTodos(sorted);
      setTodosToShow(sorted);
      setGroup({ name: 'All Todos', completed: false });
    } else {
      const savingTodo = { ...updatedTodo, isSaving: true };
      setTodos(prev => prev.map(t => (t.id === todo.id ? savingTodo : t)));
      setTodosToShow(prev => prev.map(t => (t.id === todo.id ? savingTodo : t)));

      await update(cleanTodo(updatedTodo));
      const updated = { ...updatedTodo, isSaving: false };

      setTodos(prev => {
        const updatedTodos = prev.map(t => (t.id === todo.id ? updated : t));

        const filteredTodos = updatedTodos.filter(
          t =>
            formatDate(t) === group.name
        );

        setTodosToShow(sortList(group.name === 'All Todos' ? updatedTodos : filteredTodos));
        return updatedTodos;
      });
    }

    closeModal();
  };

  const handleMarkAsCompleted = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();

    const updatedTodo = {
      ...todo,
      completed: true,
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

  const closeModal = (): void => {
    const modalLayer = document.getElementById('modal_layer') as HTMLElement;
    const modalForm = document.getElementById('form_modal') as HTMLElement;

    modalLayer.style.display = '';
    modalForm.style.display = '';

    setTodo({
      id: 0,
      title: '',
      day: '',
      month: '',
      year: '',
      completed: false,
      description: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const target = e.target;
    setTodo({
      ...todo,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <div className='modal' id='modal_layer' onClick={closeModal}></div>
      <div className='modal' id='form_modal'>
        <form onSubmit={handleSaveForm}>
          <fieldset>
            <ul>
              <li>
                <label>Title</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Item 1'
                  value={todo.title}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Due Date</label>
                <div className='date'>
                  <Select id='due_day' name='day' defaultOption='Day' options={days} handleChange={handleChange} todo={todo} />
                  <Select id='due_month' name='month' defaultOption='Month' options={months} handleChange={handleChange} todo={todo} />
                  <Select id='due_year' name='year' defaultOption='Year' options={years.map(String)} handleChange={handleChange} todo={todo} />
                </div>
              </li>
              <li>
                <label>Description</label>
                <textarea
                  cols={50}
                  name='description'
                  rows={7}
                  placeholder='Description'
                  value={todo.description}
                  onChange={handleChange}
                ></textarea>
              </li>
              <li>
                <input type='submit' value='Save' />
                <button name='complete' onClick={handleMarkAsCompleted}>
                  Mark as Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Modal;
