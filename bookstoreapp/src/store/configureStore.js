import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const configureStore = initialState => {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })) ||
    compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, invariant()))
  );

  return store;
};

export default configureStore;
