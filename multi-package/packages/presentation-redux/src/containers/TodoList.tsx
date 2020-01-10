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

  const onCheckChanged = (id: string, done: boolean) => {
    changeDoneState(id, done);
  };

  const onClickDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <TodoListComponent
      todos={todos}
      hasError={hasError}
      onCheckChanged={onCheckChanged}
      onClickDelete={onClickDelete}
      TodoForm={props => <TodoForm {...props} />}
    />
  );
};

const Loading: React.FC = () => (
  <div>loading...</div>
);
