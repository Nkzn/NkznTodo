import * as React from "react";
import { TodoListState, Todo } from "nkzn-todo-domain";
import { TodoApplicationService } from "nkzn-todo-application-redux";
import TodoAddForm from "../containers/TodoAddForm";

export interface StateProps {
  todoList: TodoListState;
}

export interface DispatcherProps {
  service: TodoApplicationService;
}

type Props = StateProps & DispatcherProps;

export class TodoList extends React.Component<Props> {

  componentDidMount() {
    this.props.service.init();
  }

  render() {
    const { loading, todos, hasError } = this.props.todoList;

    if (loading) {
      return this.renderLoading();
    }

    return (
      <div>
        {this.renderTodos(todos)}
        {hasError && <span style={{color: "red"}}>エラーがありました</span>}
      </div>
    );
  }

  private renderLoading() {
    return (
      <div>loading...</div>
    )
  }
  
  private renderTodos(todos: Todo[]) {
    return (
      <ul>
        {todos.map(todo => this.renderTodo(todo))}
        {this.renderInput()}
      </ul>
    );
  }
  
  private renderTodo(todo: Todo) {
    return (
      <li key={todo.id}>
        <span style={{ display: "inline-block", width: 50 }}>#{todo.id}</span> 
        <span style={{ display: "inline-block", width: 150 }} >{todo.title}</span>
        <input onChange={(e) => this.onCheckChanged(e)} type="checkbox" name="todo" value={todo.id} checked={todo.done} />
      </li>
    );
  }

  private onCheckChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked: done, value: id } = e.target;
    this.props.service.changeDoneState(id, done);
  }

  private renderInput() {
    return (
      <li key={"add"}>
        <TodoAddForm />
      </li>
    );
  }
}
