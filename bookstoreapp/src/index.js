import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import App from './components/app/App.component';
import { configureStore, history } from './store/configureStore';
import initialState from './reducers/initialState';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
//import { loadBooks, loadBooksAsync } from './actions/booksActions';

var store = configureStore(initialState);
//console.log(actionTypes());
// store.dispatch(loadBooksAsync());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
