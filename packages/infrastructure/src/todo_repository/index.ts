import { Todo } from "nkzn-todo-domain";

export class TodoRepository {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;

    if (!this.localStorage["todo"]) {
      this.localStorage["todo"] = JSON.stringify([]);
    }
  }

  async fetch(id: number): Promise<Todo> {
    const todoList: Todo[] = JSON.parse(this.localStorage["todo"]);
    const todo = todoList.find(todo => todo.id === id);

    await sleep(500);

    if (todo) {
      return todo;
    } else {
      return Promise.reject(`id:${id} is not found.`);
    }
  }

  async fetchList(): Promise<Todo[]> {
    const todoList: Todo[] = JSON.parse(this.localStorage["todo"]);

    await sleep(1000);

    return todoList;
  }

  async addNew(title: string, description: string, done = false): Promise<Todo> {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      done
    }

    const todoList: Todo[] = JSON.parse(this.localStorage["todo"]);
    todoList.push(newTodo);

    this.localStorage["todo"] = JSON.stringify(todoList);

    await sleep(1000);

    return newTodo;
  }
}

async function sleep(timeout = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout) ; 
  });
}