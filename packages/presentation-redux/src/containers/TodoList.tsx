import { connect } from "react-redux";
import { AppState, TodoApplicationService } from "nkzn-todo-application-redux";
import { TodoList, StateProps, DispatcherProps } from "../components/TodoList";
import { Dispatch } from "redux";

function mapStateToProps(appState: AppState): StateProps {
  return {
    todoList: appState.todoList
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatcherProps {
  return {
    service: new TodoApplicationService(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);