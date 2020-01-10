import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodoApplicationServices } from "nkzn-todo-application";
import { AppState, todoListActions } from "../ducks";
import { TodoListState } from "nkzn-todo-domain";

export const useTodoApplicationService = () => {
  const todoState = useSelector<AppState, TodoListState>(state => state.todoList);
  const dispatch = useDispatch();
  const [ service ] = useState(() => createTodoApplicationServices({
    startLoading: () => dispatch(todoListActions.startLoading()),
    init: (todoList) => dispatch(todoListActions.init({ todos: todoList })),
    failed: () => dispatch(todoListActions.failed()),
    update: (todoList) => dispatch(todoListActions.update({ todos: todoList }))
  }));

  type Service = typeof service;
  type Result = [Service, TodoListState];

  const result: Result = [service, todoState];

  return result;
};