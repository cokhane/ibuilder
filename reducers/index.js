//combine all reducers
import { combineReducers } from 'redux';
import postReducer from './postReducer'

export default combineReducers({
  posts: postReducer //pass as object
})
