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
      this.dispatch(todoListActions.failed());
    }

  }

  async addNewTodo(title: string) {
    try {
      await this.todoRepository.addNew(title);
      const todoList = await this.todoRepository.fetchList();
      this.dispatch(todoListActions.update({ todos: todoList }));
    } catch (e) {
      this.dispatch(todoListActions.failed());
    }
  }

  async editTodo(id: string, title: string) {
    try {
      await this.todoRepository.updateTitle(id, title);
      const todoList = await this.todoRepository.fetchList();
      this.dispatch(todoListActions.update({ todos: todoList }));
    } catch (e) {
      this.dispatch(todoListActions.failed());
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.todoRepository.delete(id);
      const todoList = await this.todoRepository.fetchList();
      this.dispatch(todoListActions.update({ todos: todoList }));
    } catch (e) {
      this.dispatch(todoListActions.failed());
    }
  }

  async changeDoneState(id: string, newState: boolean) {
    try {
      await this.todoRepository.update(id, newState);
      const todoList = await this.todoRepository.fetchList();
      this.dispatch(todoListActions.update({ todos: todoList }));
    } catch (e) {
      this.dispatch(todoListActions.failed());
    }
  }
}
