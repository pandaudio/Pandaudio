import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

const App = () => (
  <div>
    <div>Hello World</div>
    <Provider store={store}>
      <div>Hello World</div>
    </Provider>
  </div>

);

export default App;
