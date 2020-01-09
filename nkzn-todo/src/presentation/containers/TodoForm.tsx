import React from 'react';
import { useDispatch } from "react-redux";
import { TodoApplicationService } from "../../application/service/TodoApplicationService";
import { TodoForm as TodoFormComponent } from "../components/TodoForm";
import { todoListActions } from "../ducks";

type Props = {
  idForEdit?: string;
  onEnter?: () => void;
};

export const TodoForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const service = new TodoApplicationService({
    startLoading: () => dispatch(todoListActions.startLoading()),
    init: (todoList) => dispatch(todoListActions.init({ todos: todoList })),
    failed: () => dispatch(todoListActions.failed()),
    update: (todoList) => dispatch(todoListActions.update({ todos: todoList }))
  });

  return (
    <TodoFormComponent
      {...props}
      service={service}
    />
  )
};