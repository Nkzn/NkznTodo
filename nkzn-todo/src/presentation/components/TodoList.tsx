import * as React from "react";
import { TodoListState, Todo } from "../../domain";
import { TodoApplicationService } from "../../application/service/TodoApplicationService";
import TodoForm from "../containers/TodoForm";

export interface StateProps {
  todoList: TodoListState;
}

export interface DispatcherProps {
  service: TodoApplicationService;
}

type Props = StateProps & DispatcherProps;

interface State {
  editingTodoId?: string;
}

export class TodoList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      editingTodoId: void 0
    }
  }

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
        <span onClick={() => this.onClickTitle(todo.id)} style={{ display: "inline-block", width: 150 }} >{this.state.editingTodoId === todo.id ? <TodoForm idForEdit={todo.id} onEnter={() => this.onEnter()} /> : todo.title}</span>
        <input onChange={(e) => this.onCheckChanged(e)} type="checkbox" name="todo" value={todo.id} checked={todo.done} />
        <span onClick={() => this.onClickDelete(todo.id)} style={{ marginLeft: 8 }}>🗑</span>
      </li>
    );
  }

  private onEnter() {
    this.setState({ editingTodoId: void 0 })
  }

  private onClickTitle(id: string) {
    this.setState({ editingTodoId: id });
  }

  private onCheckChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked: done, value: id } = e.target;
    this.props.service.changeDoneState(id, done);
  }

  private onClickDelete(id: string) {
    this.props.service.deleteTodo(id);
  }

  private renderInput() {
    return (
      <li key={"add"}>
        <TodoForm />
      </li>
    );
  }
}
