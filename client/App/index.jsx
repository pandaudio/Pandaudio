import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import RoomPage from '../components/RoomPage';
import DashboardPage from '../components/DashboardPage';
// import { PrivateRoute } from './PrivateRoute';
import Chat from '../components/Chat.jsx';
import TestChat from '../components/TestChat.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/room" component={RoomPage} />
      <Route path="*" component={() => '404 NOT FOUND'} />
    </Switch>
  </div>
);

export default App;
