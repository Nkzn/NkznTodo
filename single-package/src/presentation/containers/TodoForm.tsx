import { Dispatch } from "redux";
import { connect } from "react-redux";
import { TodoApplicationService } from "../../application";
import { TodoForm, DispatcherProps } from "../components/TodoForm";
import { todoListActions } from "../ducks";

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

export default connect(void 0, mapDispatchToProps)(TodoForm);