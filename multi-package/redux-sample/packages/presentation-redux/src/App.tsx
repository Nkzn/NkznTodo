import * as React from 'react';
import TodoList from "./containers/TodoList";

export default class App extends React.PureComponent<any> {
  render() {
    return (
      <div>
        <TodoList />
      </div>    
    );
  }
}