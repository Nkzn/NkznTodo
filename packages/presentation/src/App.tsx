import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from "react-redux";

import { AppState, TodoApplicationService } from "nkzn-todo-application";
import { TodoListState } from 'nkzn-todo-domain';

interface IStateProps {
  todoList: TodoListState
}

interface IDispatcherProps {
  service: TodoApplicationService;
}

type Props = IStateProps & IDispatcherProps;

const connector = connect(
  (state: AppState) => ({
    todoList: state.todoList
  }) as IStateProps,
  (dispatch: Dispatch) => ({
    service: new TodoApplicationService(dispatch)
  }) as IDispatcherProps
)

class App extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.onClickInit = this.onClickInit.bind(this);
  }

  render() {
    return (
      <div>
        <div>initial state: {JSON.stringify(this.props.todoList)}</div>
        <button onClick={this.onClickInit}>init</button>
      </div>    
    );
  }

  private onClickInit() {
    this.props.service.init()
  }
}

export default connector(App);