import actionTypes from '../constants/actionTypes';
import { InvokeHttp } from '../httpUtils/AjaxGateway';

const loadBooksSuccess = books => {
  return { type: actionTypes.LOAD_BOOKS_SUCCESS, books };
};

const loadBooksError = errMessage => {
  return { type: actionTypes.LOAD_BOOKS_ERROR, errMessage };
};

const clearStaleStateData = errMessage => {
  return { type: actionTypes.CLEAR_STALE_STATE_DATA };
};

const loadBooksAsync = () => {
  console.log('invoked loadBooksAsync');
  return (dispatch, appState) => {
    InvokeHttp(
      { method: 'GET', url: `http://localhost:3600/books` },
      response => {
        dispatch(loadBooksSuccess(response));
      },
      err =>
        dispatch(loadBooksError(`could not retrieve data, please try again`))
    );
  };
};

export { loadBooksAsync };
