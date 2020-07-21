import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
// Redux
import store from '../store';
import { PrivateRoute } from './PrivateRoute';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LoginPage} />
    </Switch>
  </div>
);

// const App = () => (
//   <div>
//     <LoginPage />
//     <div>Hello World</div>
//     <Provider store={store}>
//       <div>Hello World</div>
//     </Provider>
//   </div>
// );

export default App;
