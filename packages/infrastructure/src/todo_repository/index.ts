import { Todo } from "nkzn-todo-domain";

const STRAGE_KEY_TODO = "todo";

export class TodoRepository {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;

    if (!this.localStorage[STRAGE_KEY_TODO]) {
      this.localStorage[STRAGE_KEY_TODO] = JSON.stringify([]);
    }
  }

  async fetch(id: number): Promise<Todo> {
    const todoList: Todo[] = JSON.parse(this.localStorage[STRAGE_KEY_TODO]);
    const todo = todoList.find(t => t.id === id);

    await sleep(500);

    if (todo) {
      return todo;
    } else {
      return Promise.reject(`id:${id} is not found.`);
    }
  }

  async fetchList(): Promise<Todo[]> {
    const todoList: Todo[] = JSON.parse(this.localStorage[STRAGE_KEY_TODO]);

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

    const todoList: Todo[] = JSON.parse(this.localStorage[STRAGE_KEY_TODO]);
    todoList.push(newTodo);

    this.localStorage[STRAGE_KEY_TODO] = JSON.stringify(todoList);

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