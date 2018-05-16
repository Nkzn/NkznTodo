import { connect } from "react-redux";
import { TodoApplicationService } from "../../application";
import { TodoForm, DispatcherProps } from "../components/TodoForm";
import { Dispatch } from "redux";

function mapDispatchToProps(dispatch: Dispatch): DispatcherProps {
  return {
    service: new TodoApplicationService(dispatch)
  }
}

export default connect(void 0, mapDispatchToProps)(TodoForm);