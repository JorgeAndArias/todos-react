import React, { JSX } from 'react';
import Modal from './Modal';
import List from './List';
import { Todo } from '../types/types';

interface MainProps {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  todo: Todo
  setTodo: React.Dispatch<React.SetStateAction<Todo>>
  todosToShow: Todo[]
  setTodosToShow: React.Dispatch<React.SetStateAction<Todo[]>>
  group: {
    name: string;
    completed: boolean;
  }
  setGroup: React.Dispatch<React.SetStateAction<{
    name: string;
    completed: boolean;
  }>>
}


const Main: React.FC<MainProps> = ({ todos, setTodos, todo, setTodo, todosToShow, setTodosToShow, group, setGroup }): JSX.Element => {

  return (
    <div id="items" >
      < Modal
        todos={todos}
        setTodos={setTodos}
        todo={todo}
        setTodo={setTodo}
        setTodosToShow={setTodosToShow}
        group={group}
        setGroup={setGroup}
      />
      < List
        todos={todos}
        setTodos={setTodos}
        setTodo={setTodo}
        todosToShow={todosToShow}
        setTodosToShow={setTodosToShow}
        group={group}
      />
    </div>
  )
}

export default Main;