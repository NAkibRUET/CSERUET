import {combineReducers} from 'redux';
import books from './books_reducer';
import user from './user_reducer';
import admin from './admin_reducer';
const rootReducer = combineReducers({
	books,
	user,
	admin
})

export default rootReducer;