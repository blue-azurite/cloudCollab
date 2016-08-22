import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Github from './container/Github';
import GithubTree from './components/TreeView';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';

function configureStore(initialState) {
  const store = createStore(
    rootReducer, 
    initialState, 
    compose(
      applyMiddleware(ReduxPromise), 
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

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/" component={Github}>
          <Route path="/" component={GithubTree}/>
        </Route>
      </Route>
    </Router>
  </Provider>
  ), document.querySelector('#app'));