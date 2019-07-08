import actionTypes from '../constants/actionTypes';
import { InvokeHttp } from '../httpUtils/AjaxGateway';

const clearStaleBookInfoData = errMessage => {
  return { type: actionTypes.CLEAR_STALE_BOOKINFO_DATA };
};

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
      response => {
        dispatch(loadBookInfoSuccess(response));
      },
      err => {
        dispatch(
          loadBookInfoError(`could not retrieve data, please try again`)
        );
      }
    );
  };
};

const editBookInfoSuccess = bookInfo => {
  return { type: actionTypes.BOOKEDIT_SUCCESS, bookInfo };
};

const editBookInfoError = errMessage => {
  return { type: actionTypes.LOAD_BOOKINFO_ERROR, errMessage };
};

const handleBookInfoEdit = (bookInfo, setSubmitting, container) => {
  console.log('invoked handleBookInfoEdit');
  let { id, ...postData } = bookInfo;
  return (dispatch, appState) => {
    InvokeHttp(
      {
        method: 'PUT',
        url: `http://localhost:3600/books/${id}`,
        data: postData
      },
      response => {
        setSubmitting(false);
        container.success(`Book has been Updated`, ``, {
          closeButton: true
        });
        dispatch(editBookInfoSuccess(response));
      },
      err => {
        dispatch(
          editBookInfoError(`could not edit bookInfo, please try again`)
        );
      }
    );
  };
};

const createBookInfoSuccess = bookInfo => {
  return { type: actionTypes.BOOKCREATE_SUCCESS, bookInfo };
};

const createBookInfoError = errMessage => {
  return { type: actionTypes.BOOKCREATE_ERROR, errMessage };
};

const handleBookInfoCreate = (bookInfo, setSubmitting, container) => {
  console.log('invoked handleBookInfoCreate');
  let { id, ...postData } = bookInfo;
  return (dispatch, appState) => {
    InvokeHttp(
      {
        method: 'POST',
        url: `http://localhost:3600/books`,
        data: postData
      },
      response => {
        setSubmitting(false);
        container.success(`Book has been Created`, ``, {
          closeButton: true
        });
        dispatch(createBookInfoSuccess(response));
      },
      err => {
        dispatch(
          createBookInfoError(`could not create bookInfo, please try again`)
        );
      }
    );
  };
};

export { loadBookInfoAsync, clearStaleBookInfoData, handleBookInfoEdit,handleBookInfoCreate };
