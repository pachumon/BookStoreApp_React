import actionTypes from '../constants/actionTypes';
import initialState from './initialState';

const booksReducer = (state = initialState.books, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKS_SUCCESS:
      return { ...state, data: [...action.books] };    
    case actionTypes.LOAD_BOOKS_ERROR:
      return { ...state, errorInfo: action.errMessage };    
    default:
      return state;
  }
};

export default booksReducer;
