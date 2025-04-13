import React, { JSX } from 'react';
import { Todo, TodoGroups } from '../types/types';
import { generateTodoGroups } from '../utils/utils';

interface NavAllListProps {
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

const NavAllList: React.FC<NavAllListProps> = ({ todos, setTodosToShow, group, setGroup }): JSX.Element => {
  const todosGroups = generateTodoGroups(todos);

  const handleDisplayTodos = (todoGroup: TodoGroups): void => {
    setTodosToShow(todoGroup.todos);
    setGroup({
      name: `${todoGroup.date}`,
      completed: false
    });
  }

  return (
    <>
      {
        todosGroups.map((todoGroup, index) => (
          <dl
            key={index}
            onClick={() => handleDisplayTodos(todoGroup)}
            className={group.name === todoGroup.date && !group.completed ? 'active' : ''}
          >
            <dt><time>{todoGroup.date}</time></dt>
            <dd>{todoGroup.total}</dd>
          </dl>
        ))
      }
    </>
  )
}

export default NavAllList;