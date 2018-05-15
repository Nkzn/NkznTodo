export interface Todo {
  id: string;
  title: string;
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
      todos,
      hasError: false,
    }
  },

  failed(prevState: TodoListState): TodoListState {
    return {
      ...prevState,
      loading: false,
      hasError: true,
    }
  },

  updated(todos: Todo[]): TodoListState {
    return {
      loading: false,
      todos,
      hasError: false,
    }
  },
}