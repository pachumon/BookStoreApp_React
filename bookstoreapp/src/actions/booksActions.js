import actionTypes from '../constants/actionTypes';
import { InvokeHttp } from '../httpUtils/AjaxGateway';

const loadBooksSuccess = books => {
  return { type: actionTypes.LOAD_BOOKS_SUCCESS, books };
};

const loadBooksError = errMessage => {
  return { type: actionTypes.LOAD_BOOKS_ERROR, errMessage };
};

const removeBookInfoSuccess = bookId => {
  return { type: actionTypes.REMOVE_BOOKINFO_SUCCESS, bookId };
};

const removeBookInfoError = errMessage => {
  return { type: actionTypes.REMOVE_BOOKINFO_ERROR, errMessage };
};

const loadBooks = () => {
  console.log('invoked loadBooks');
  return (dispatch, appState) => {
    InvokeHttp(
      { method: 'GET', url: `http://localhost:3600/books` },
      response => {
        dispatch(loadBooksSuccess(response));
      },
      err => {
        dispatch(loadBooksError(`could not retrieve data, please try again`));
      }
    );
  };
};

const removeBookInfo = (bookId,container) => {
  console.log('invoked removeBookInfo');  
  return (dispatch, appState) => {
    InvokeHttp(
      { method: 'DELETE', url: `http://localhost:3600/books/${bookId}` },
      response => {
        container.success(`Book has been Removed♠`, ``, {
          closeButton: true
        });
        dispatch(removeBookInfoSuccess(bookId));
      },
      err => {
        dispatch(
          removeBookInfoError(`could not remove bookInfo, please try again`)
        );
      }
    );
  };
};

export { loadBooks, removeBookInfo };
