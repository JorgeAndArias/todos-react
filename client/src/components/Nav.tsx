import React, { JSX } from 'react';
import NavAllHeader from './NavAllHeader';
import NavCompletedHeader from './NavCompletedHeader';
import { Todo } from '../types/types';
import NavAllList from './NavAllList';
import NavCompletedList from './NavCompletedList';


interface NavProps {
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

const Nav: React.FC<NavProps> = ({ todos, setTodosToShow, group, setGroup }): JSX.Element => {

  return (
    <>
      <div id="sidebar" >
        <section id="all">
          <div id="all_todos">
            <NavAllHeader
              todos={todos}
              setTodosToShow={setTodosToShow}
              group={group}
              setGroup={setGroup}
            />
          </div>
          <article id="all_lists">
            <NavAllList
              todos={todos}
              setTodosToShow={setTodosToShow}
              group={group}
              setGroup={setGroup}
            />
          </article>
        </section>
        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <NavCompletedHeader
              todos={todos}
              setTodosToShow={setTodosToShow}
              group={group}
              setGroup={setGroup}
            />
          </div>
          <article id="completed_lists">
            < NavCompletedList
              todos={todos}
              setTodosToShow={setTodosToShow}
              group={group}
              setGroup={setGroup}
            />
          </article>
        </section>
      </div>
    </>
  )
}

export default Nav;