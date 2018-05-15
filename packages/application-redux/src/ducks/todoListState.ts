import { Reducer } from "redux";
import actionCreatorFactory, { ActionCreator } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Todo, TodoListState, TodoListStateHandler as StateHandler } from "nkzn-todo-domain";

/* Actions */

const actionCreator = actionCreatorFactory("TodoListState");

const startLoading = actionCreator("startLoading");

const init: ActionCreator<InitPayload> = actionCreator("init");
export interface InitPayload {
  todos: Todo[];
}

const initFailed = actionCreator("initFailed");

export const actions = {
  startLoading,
  init,
  initFailed,
}

/* Reducer */

const defaultState = StateHandler.initialState();

export const reducer: Reducer<TodoListState> = reducerWithInitialState(defaultState)
  .case(startLoading, state => {
    return StateHandler.startLoading(state);
  })
  .case(init, (state, { todos }) => {
    return StateHandler.initialized(todos);
  })
  .case(initFailed, state => {
    return StateHandler.initializeFailed(state);
  });
