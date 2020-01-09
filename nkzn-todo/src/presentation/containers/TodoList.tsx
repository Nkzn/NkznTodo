import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TodoApplicationService } from "../../application/service/TodoApplicationService";
import { TodoList as TodoListComponent } from "../components/TodoList";
import { AppState, todoListActions } from "../ducks";
import { TodoListState } from "../../domain";
import { TodoForm } from './TodoForm';

export const TodoList: React.FC = () => {
  const todoList = useSelector<AppState, TodoListState>(state => state.todoList);
  const dispatch = useDispatch();
  const service = new TodoApplicationService({
    startLoading: () => dispatch(todoListActions.startLoading()),
    init: (todoList) => dispatch(todoListActions.init({ todos: todoList })),
    failed: () => dispatch(todoListActions.failed()),
    update: (todoList) => dispatch(todoListActions.update({ todos: todoList }))
  });

  return (
    <TodoListComponent
      todoList={todoList}
      service={service}
      TodoForm={props => <TodoForm {...props} />}
    />
  );
};