import React, { JSX } from 'react';
import { Todo, TodoGroups } from '../types/types';
import { generateTodoGroups, formatDate } from '../utils/utils';

interface NavCompletedListProps {
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

const NavCompletedList: React.FC<NavCompletedListProps> = ({ todos, setTodosToShow, group, setGroup }): JSX.Element => {
  const completedTodoGroups = generateTodoGroups(todos).filter(group => group.totalCompleted > 0);

  const handleDisplayCompleted = (todoGroup: TodoGroups): void => {
    setTodosToShow(todoGroup.todos.filter(todo => todo.completed));
    setGroup({
      name: `${todoGroup.date}`,
      completed: true
    });
  }

  return (
    <>
      {
        completedTodoGroups.map((todoGroup, index) => (
          <dl
            key={index}
            onClick={() => handleDisplayCompleted(todoGroup)}
            className={group.name === todoGroup.date && group.completed ? 'active' : ''}
          >
            <dt><time>{todoGroup.date}</time></dt>
            <dd>{todos.filter(todo => formatDate(todo) === todoGroup.date && todo.completed === true).length}</dd>
          </dl>
        ))
      }
    </>
  )
}

export default NavCompletedList;