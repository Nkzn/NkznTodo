import React, { useState, useEffect } from 'react';
import { TodoList as TodoListComponent } from "../components/TodoList";
import { TodoForm } from './TodoForm';
import { useTodoApplicationService } from './useTodoApplicationService';

export const TodoList: React.FC = () => {
  const [ initializeCalled, setInitializeCalled ] = useState(false);
  const [ { init, changeDoneState, deleteTodo }, { todos, loading, hasError } ] = useTodoApplicationService();

  useEffect(() => {
    if (!initializeCalled) {
      init();
      setInitializeCalled(true);
    }
  }, [init, initializeCalled]);

  if (loading) {
    return <Loading />
  }

  return (
    <TodoListComponent
      todos={todos}
      hasError={hasError}
      changeDoneState={changeDoneState}
      deleteTodo={deleteTodo}
      TodoForm={props => <TodoForm {...props} />}
    />
  );
};

const Loading: React.FC = () => (
  <div>loading...</div>
);
