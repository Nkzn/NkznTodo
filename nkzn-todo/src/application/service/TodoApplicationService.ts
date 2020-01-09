import { TodoRepository } from "../../infrastructure";
import { TodoListPresenter } from "../presenter/TodoListPresenter";

export class TodoApplicationService {

  private todoRepository: TodoRepository;

  constructor(private presenter: TodoListPresenter) {
    this.todoRepository = new TodoRepository();
  }

  async init() {
    this.presenter.startLoading();
    
    try {
      const todoList = await this.todoRepository.fetchList();
      this.presenter.init(todoList);
    } catch (e) {
      this.presenter.failed();
    }

  }

  async addNewTodo(title: string) {
    try {
      await this.todoRepository.addNew(title);
      const todoList = await this.todoRepository.fetchList();
      this.presenter.update(todoList);
    } catch (e) {
      this.presenter.failed();
    }
  }

  async editTodo(id: string, title: string) {
    try {
      await this.todoRepository.updateTitle(id, title);
      const todoList = await this.todoRepository.fetchList();
      this.presenter.update(todoList);
    } catch (e) {
      this.presenter.failed();
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.todoRepository.delete(id);
      const todoList = await this.todoRepository.fetchList();
      this.presenter.update(todoList);
    } catch (e) {
      this.presenter.failed();
    }
  }

  async changeDoneState(id: string, newState: boolean) {
    try {
      await this.todoRepository.update(id, newState);
      const todoList = await this.todoRepository.fetchList();
      this.presenter.update(todoList);
    } catch (e) {
      this.presenter.failed();
    }
  }
}
