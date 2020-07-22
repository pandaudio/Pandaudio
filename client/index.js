/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import DashboardPage from '../client/components/DashboardPage'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <DashboardPage />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
