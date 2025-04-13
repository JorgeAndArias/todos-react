import { JSX } from 'react';
import { Todo as TodoType } from '../types/types';
import Todo from './Todo';

interface ListProps {
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

const openModal = (): void => {
  const modalLayer = document.getElementById('modal_layer') as HTMLElement;
  const modalForm = document.getElementById('form_modal') as HTMLElement;

  modalLayer.style.display = 'block';
  modalForm.style.display = 'block';
}

const List: React.FC<ListProps> = ( { todos, setTodos, setTodo, todosToShow, setTodosToShow, group }): JSX.Element => {
  return (
    <>
    <header>
      <dl>
        <dt>{group.name}</dt>
        <dd>{todosToShow.length}</dd>
      </dl>
    </header>
    <main>
      <label onClick={openModal}>
        <img src='src/assets/images/plus.png' alt='Add Todo Item' />
        <h2>Add new to do</h2>
      </label>
    </main>
    <table cellSpacing={0}>
      <tbody>
        {
          todosToShow.map((todo, index) =>
            <Todo
              key={index}
              todos={todos}
              setTodos={setTodos}
              todo={todo}
              setTodo={setTodo}
              todosToShow={todosToShow}
              setTodosToShow={setTodosToShow}
              group={group}
            />
          )
        }
      </tbody>
    </table>
    </>
  )
}

export default List;
