import { combineReducers } from 'redux';
import books from './booksReducer';
import bookInfo from './bookInfoReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history)=>combineReducers({
  books,
  bookInfo,
  router:connectRouter(history)
});

export default rootReducer;
