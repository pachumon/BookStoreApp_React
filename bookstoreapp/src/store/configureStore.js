import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const history = createBrowserHistory();

const configureStore = initialState => {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })) ||
    compose;

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, invariant())
    )
  );

  return store;
};

export { configureStore, history };
