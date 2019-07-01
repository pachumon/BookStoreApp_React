import { combineReducers } from 'redux';
import books from './booksReducer';
import bookInfo from './bookInfoReducer';

const rootReducer = combineReducers({
  books,
  bookInfo
});

export default rootReducer;
