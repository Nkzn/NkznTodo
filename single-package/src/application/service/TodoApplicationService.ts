import { TodoRepository } from "../../infrastructure";
import { TodoListPresenter } from "../presenter/TodoListPresenter";

export const createTodoApplicationServices = (presenter: TodoListPresenter) => {
  const todoRepository = new TodoRepository();

  const init = async () => {
    presenter.startLoading();
    
    try {
      const todoList = await todoRepository.fetchList();
      presenter.init(todoList);
    } catch (e) {
      presenter.failed();
    }

  }

  const addNewTodo = async (title: string) => {
    try {
      await todoRepository.addNew(title);
      const todoList = await todoRepository.fetchList();
      presenter.update(todoList);
    } catch (e) {
      presenter.failed();
    }
  }

  const editTodo = async (id: string, title: string) => {
    try {
      await todoRepository.updateTitle(id, title);
      const todoList = await todoRepository.fetchList();
      presenter.update(todoList);
    } catch (e) {
      presenter.failed();
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await todoRepository.delete(id);
      const todoList = await todoRepository.fetchList();
      presenter.update(todoList);
    } catch (e) {
      presenter.failed();
    }
  }

  const changeDoneState = async (id: string, newState: boolean) => {
    try {
      await todoRepository.update(id, newState);
      const todoList = await todoRepository.fetchList();
      presenter.update(todoList);
    } catch (e) {
      presenter.failed();
    }
  }

  return {
    init,
    addNewTodo,
    editTodo,
    deleteTodo,
    changeDoneState,
  };
};
