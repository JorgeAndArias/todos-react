import React, { JSX } from 'react';
import { Todo,  } from '../types/types';

interface NavAllHeaderProps {
  todos: Todo[]
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

const NavAllHeader: React.FC<NavAllHeaderProps> = ({ todos, setTodosToShow, group, setGroup }): JSX.Element => {
  const handleDisplayAll = () => {
    setTodosToShow(todos);
    setGroup({
      name: 'All Todos',
      completed: false
    });
  }


  return (
    <div onClick={handleDisplayAll}>
      <header id="all_header" className={group.name === 'All Todos' ? 'active' : ''} >
        <dl>
          <dt>All Todos</dt>
            <dd>{todos.length}</dd>
        </dl>
      </header>
    </div>

  )
}

export default NavAllHeader;