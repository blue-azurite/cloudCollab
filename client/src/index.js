import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './container/App';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

function configureStore(initialState) {
  const store = createStore(
    rootReducer, 
    initialState, 
    compose(
      applyMiddleware(ReduxPromise, thunk), 
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};


let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#app'));