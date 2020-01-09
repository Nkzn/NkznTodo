import { Todo } from "../../domain";

export interface TodoListPresenter {
  startLoading: () => void;
  init: (todoList: Todo[]) => void;
  failed: () => void;
  update: (todoList: Todo[]) => void;
}