import { Todo } from "../../domain";

const STRAGE_KEY_TODO = "todo";

export class TodoRepository {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;

    if (!this.localStorage[STRAGE_KEY_TODO]) {
      this.save([]);
    }
  }

  async fetch(id: string): Promise<Todo> {
    const todoList: Todo[] = this.load();
    const todo = todoList.find(t => t.id === id);

    await sleep(500);

    if (todo) {
      return todo;
    } else {
      return Promise.reject(`id:${id} is not found.`);
    }
  }

  async fetchList(): Promise<Todo[]> {
    const todoList: Todo[] = this.load();

    await sleep(1000);

    return todoList;
  }

  async addNew(title: string, description?: string, done = false): Promise<Todo> {
    const newTodo: Todo = {
      id: `${this.calcNextid()}`,
      title,
      done
    }

    const todoList: Todo[] = this.load();
    todoList.push(newTodo);

    this.save(todoList);

    await sleep(1000);

    return newTodo;
  }

  async update(id: string, newState: boolean): Promise<any> {
    const todoList: Todo[] = this.load();
    const todo = todoList.find(t => t.id === id);

    if (todo) {
      todo.done = newState;
      this.save(todoList);

      sleep(500);

      return Promise.resolve();
    } else {
      return Promise.reject(`id:${id} is not found.`);
    }
  }

  async updateTitle(id: string, title: string): Promise<any> {
    const todoList: Todo[] = this.load();
    const todo = todoList.find(t => t.id === id);

    if (todo) {
      todo.title = title;
      this.save(todoList);

      sleep(500);

      return Promise.resolve();
    } else {
      return Promise.reject(`id:${id} is not found.`);
    }
  }

  async delete(id: string): Promise<any> {
    const todoList: Todo[] = this.load();
    const listWithoutDeleted = todoList.filter(t => t.id !== id);

    this.save(listWithoutDeleted);

    sleep(500);

    return Promise.resolve();
  }

  private save(todoList: Todo[]) {
    this.localStorage[STRAGE_KEY_TODO] = JSON.stringify(todoList);
  }

  private load(): Todo[] {
    return JSON.parse(this.localStorage[STRAGE_KEY_TODO]);
  }

  private calcNextid(): number {
    const todos = this.load();
    const sortedTodos = todos.map(t => t.id).map(id => parseInt(id, 10)).sort((a, b) => a - b);
    return sortedTodos.length === 0 ? 0 : (sortedTodos[sortedTodos.length - 1] + 1);
  }
}

async function sleep(timeout = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout) ; 
  });
}