import actionTypes from '../constants/actionTypes';
import initialState from './initialState';
import * as R from 'ramda';

const filterBookinfo = (filterId, book) => book.id !== filterId;

const booksReducer = (state = initialState.books, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKS_SUCCESS:
      return { ...state, data: [...action.books] };
    case actionTypes.LOAD_BOOKS_ERROR:
      return { ...state, errorInfo: action.errMessage };
    case actionTypes.REMOVE_BOOKINFO_SUCCESS: {
      return {
        ...state,
        data: R.filter(R.curry(filterBookinfo)(action.bookId), state.data)
      };
    }
    default:
      return state;
  }
};

export default booksReducer;
