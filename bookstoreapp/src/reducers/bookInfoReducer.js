import actionTypes from '../constants/actionTypes';
import initialState from './initialState';

const bookInfoReducer = (state = initialState.bookInfo, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKINFO_SUCCESS:
      return { ...state, data: { ...action.bookInfo } };
    case actionTypes.LOAD_BOOKINFO_ERROR:
      return { ...state, errorInfo: action.errMessage };
    case actionTypes.CLEAR_STALE_BOOKINFO_DATA:      
      return { ...state, data: {}, errorInfo: '' };
    default:
      return state;
  }
};

export default bookInfoReducer;
