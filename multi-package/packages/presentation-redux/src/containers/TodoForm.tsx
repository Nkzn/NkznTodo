import React from 'react';
import { TodoForm as TodoFormComponent } from "../components/TodoForm";
import { useTodoApplicationService } from './useTodoApplicationService';

type Props = {
  idForEdit?: string;
  onEnter?: () => void;
};

export const TodoForm: React.FC<Props> = (props) => {
  const [{ editTodo, addNewTodo }] = useTodoApplicationService();

  return (
    <TodoFormComponent
      {...props}
      editTodo={editTodo}
      addNewTodo={addNewTodo}
    />
  )
};