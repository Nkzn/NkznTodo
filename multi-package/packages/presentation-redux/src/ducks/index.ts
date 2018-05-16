import { Reducer, combineReducers } from "redux";
import { TodoListState } from "nkzn-todo-domain";

import { reducer as todoList } from "./todoListState";
export { actions as todoListActions } from "./todoListState";

export interface AppState {
  todoList: TodoListState;
}

export const appState: Reducer<AppState> = combineReducers({
  todoList
});