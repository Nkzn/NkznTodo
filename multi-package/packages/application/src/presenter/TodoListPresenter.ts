import { Todo } from "nkzn-todo-domain";

export interface TodoListPresenter {
  startLoading: () => void;
  init: (todoList: Todo[]) => void;
  failed: () => void;
  update: (todoList: Todo[]) => void;
}