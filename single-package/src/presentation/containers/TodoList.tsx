import { connect } from "react-redux";
import { TodoApplicationService } from "../../application";
import { TodoList, StateProps, DispatcherProps } from "../components/TodoList";
import { Dispatch } from "redux";
import { AppState, todoListActions } from "../ducks";

function mapStateToProps(appState: AppState): StateProps {
  return {
    todoList: appState.todoList
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatcherProps {
  return {
    service: new TodoApplicationService({
      startLoading: () => dispatch(todoListActions.startLoading()),
      init: (todoList) => dispatch(todoListActions.init({ todos: todoList })),
      failed: () => dispatch(todoListActions.failed()),
      update: (todoList) => dispatch(todoListActions.update({ todos: todoList }))
    })
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);