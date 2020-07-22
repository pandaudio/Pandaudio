import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
// import { PrivateRoute } from './PrivateRoute';
import Chat from '../components/Chat.jsx';
import TestChat from '../components/TestChat.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="*" component={() => '404 NOT FOUND'} />
    </Switch>
    <Chat />
  </div>
);

export default App;
