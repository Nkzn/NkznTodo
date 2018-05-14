import { Dispatch } from "redux";
import { TodoRepository } from "nkzn-todo-infrastructure";
import { todoListActions } from "../ducks";

export class TodoApplicationService {

  private todoRepository: TodoRepository;

  constructor(private dispatch: Dispatch<any>) {
    this.todoRepository = new TodoRepository();
  }

  async init() {
    this.dispatch(todoListActions.startLoading());
    
    try {
      const todoList = await this.todoRepository.fetchList();
      this.dispatch(todoListActions.init({ todos: todoList }));
    } catch (e) {
      this.dispatch(todoListActions.initFailed());
    }

  }
}
