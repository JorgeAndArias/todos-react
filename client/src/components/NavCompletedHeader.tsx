import React, { JSX } from 'react';
import { Todo } from '../types/types';
import { totalCompletedTodos } from '../utils/utils';


interface NavCompletedHeaderProps {
  todos: Todo[];
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

const NavCompletedHeader: React.FC<NavCompletedHeaderProps> = ({ todos, setTodosToShow, group, setGroup }): JSX.Element => {
  const handleDisplayCompleted = (): void => {
    setTodosToShow(todos.filter(todo => todo.completed));
    setGroup({
      name: 'Completed',
      completed: true
    });
  }

  return (
    <div onClick={handleDisplayCompleted}>
        <header className={group.name === 'Completed' ? 'active' : ''}>
          <dl>
            <dt>Completed</dt>
            <dd>{totalCompletedTodos(todos)}</dd>
          </dl>
        </header>
    </div>
  )
}

export default NavCompletedHeader;