import { connect } from "react-redux";
import { TodoApplicationService } from "nkzn-todo-application-redux";
import { TodoAddForm, DispatcherProps } from "../components/TodoAddForm";
import { Dispatch } from "redux";

function mapDispatchToProps(dispatch: Dispatch): DispatcherProps {
  return {
    service: new TodoApplicationService(dispatch)
  }
}

export default connect(void 0, mapDispatchToProps)(TodoAddForm);