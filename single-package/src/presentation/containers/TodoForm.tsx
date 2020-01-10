import React from 'react';
import { TodoForm as TodoFormComponent } from "../components/TodoForm";
import { useTodoApplicationService } from './useTodoApplicationService';

type Props = {
  idForEdit?: string;
  onEnter?: () => void;
};

export const TodoForm: React.FC<Props> = (props) => {
  const [{ editTodo, addNewTodo }] = useTodoApplicationService();

  const onEnterForEdit = (id: string, title: string | undefined) => {
    editTodo(id, title || "");
  };

  const onEnterForCreate = (title: string | undefined) => {
    addNewTodo(title || "");
  };

  return (
    <TodoFormComponent
      {...props}
      onEnterForEdit={onEnterForEdit}
      onEnterForCreate={onEnterForCreate}
    />
  )
};