export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface TodoListState {
  loading: boolean;
  todos: Todo[];
  hasError: boolean;
}

export const TodoListStateHandler = {

  initialState(): TodoListState {
    return {
      loading: false,
      todos: [],
      hasError: false,
    }
  },

  startLoading(prevState: TodoListState): TodoListState {
    return {
      ...prevState,
      loading: true,
      hasError: false,
    }
  },

  initialized(todos: Todo[]): TodoListState {
    return {
      loading: false,
      todos: todos,
      hasError: false,
    }
  },

  initializeFailed(prevState: TodoListState): TodoListState {
    return {
      ...prevState,
      loading: false,
      hasError: true,
    }
  }
}