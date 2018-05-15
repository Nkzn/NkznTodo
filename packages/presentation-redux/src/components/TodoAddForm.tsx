import * as React from "react";
import { TodoApplicationService } from "nkzn-todo-application-redux";

export interface DispatcherProps {
  service: TodoApplicationService;
}

interface State {
  title: string;
}

export class TodoAddForm extends React.Component<DispatcherProps, State> {

  constructor(props: DispatcherProps) {
    super(props);

    this.state = {
      title: ""
    }
  }

  onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.props.service.addNewTodo(this.state.title || "");
      this.setState({ title: "" });
    }
  }

  render() {
    return (
      <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} onKeyPress={(e) => this.onKeyPress(e)} />
    );
  }
}