import * as React from "react";
import { TodoApplicationService } from "../../application";

export interface DispatcherProps {
  service: TodoApplicationService;
}

type Props = DispatcherProps & {
  idForEdit?: string;
  onEnter?: () => void;
}

interface State {
  title: string;
}

export class TodoForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      title: ""
    }
  }

  onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (this.props.idForEdit) {
        this.props.service.editTodo(this.props.idForEdit, this.state.title || "");
        // tslint:disable-next-line:no-unused-expression
        this.props.onEnter && this.props.onEnter();
      } else {
        this.props.service.addNewTodo(this.state.title || "");
      }
      this.setState({ title: "" });
    }
  }

  render() {
    return (
      <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} onKeyPress={(e) => this.onKeyPress(e)} />
    );
  }
}