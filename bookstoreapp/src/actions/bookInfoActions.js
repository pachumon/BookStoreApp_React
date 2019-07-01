import actionTypes from '../constants/actionTypes';
import { InvokeHttp } from '../httpUtils/AjaxGateway';

const loadBookInfoSuccess = bookInfo => {
  
  return { type: actionTypes.LOAD_BOOKINFO_SUCCESS, bookInfo };
};

const loadBookInfoError = errMessage => {
  return { type: actionTypes.LOAD_BOOKINFO_ERROR, errMessage };
};

const loadBookInfoAsync = bookId => {  
  console.log('invoked loadBookInfoAsync');
  
  return (dispatch, appState) => {
    InvokeHttp(
      { method: 'GET', url: `http://localhost:3600/books/${bookId}` },
      response => dispatch(loadBookInfoSuccess(response)),
      err =>
        dispatch(loadBookInfoError(`could not retrieve data, please try again`))
    );
  };
};

export { loadBookInfoAsync };
