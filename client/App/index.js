import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <div>Hello World</div>
  </Provider>
);

export default App;
