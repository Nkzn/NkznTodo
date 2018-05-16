import { Reducer } from "redux";
import actionCreatorFactory, { ActionCreator } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Todo, TodoListState, TodoListStateHandler as StateHandler } from "../../domain";

/* Actions */

const actionCreator = actionCreatorFactory("TodoListState");

const startLoading = actionCreator("startLoading");

const init: ActionCreator<InitPayload> = actionCreator("init");
export interface InitPayload {
  todos: Todo[];
}

const failed = actionCreator("failed");

const update: ActionCreator<UpdatePayload> = actionCreator("update");
export interface UpdatePayload {
  todos: Todo[];
}

export const actions = {
  startLoading,
  init,
  failed,
  update,
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
  .case(failed, state => {
    return StateHandler.failed(state);
  })
  .case(update, (state, { todos }) => {
    return StateHandler.updated(todos);
  })
