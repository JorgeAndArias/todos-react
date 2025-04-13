import { useEffect, useState } from 'react';
import './App.css';
import { Todo } from './types/types';
import Nav from './components/Nav.tsx';
import Main from './components/Main.tsx';
import { getTodos } from './services/todos.ts';
import { sortList } from './utils/utils.ts';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    title: '',
    day: '',
    month: '',
    year: '',
    completed: false,
    description: '',
  });
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const [group, setGroup] = useState({
    name: '',
    completed: false,
  });
  // Need to add typing for group and setGroup

  useEffect(() => {
    initialiseTodos();
  }, []);

  const initialiseTodos = async () => {
    const todos = await getTodos();
    sortList(todos);
    setTodos(todos);
    setTodosToShow(todos);
    setGroup({
      name: 'All Todos',
      completed: false,
    });
  }

  return (
    <>
      <input type='checkbox' id='sidebar_toggle' />
      <Nav
        todos={todos}
        setTodosToShow={setTodosToShow}
        group={group}
        setGroup={setGroup}
      />
      <Main
        todos={todos}
        setTodos={setTodos}
        todo={todo}
        setTodo={setTodo}
        todosToShow={todosToShow}
        setTodosToShow={setTodosToShow}
        group={group}
        setGroup={setGroup}
      />
    </>
  )
}

export default App
