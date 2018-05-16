import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { appState } from "../presentation/ducks";
import App from './App';
import './index.css';

const store = createStore(appState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
