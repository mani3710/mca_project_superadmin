import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './admin';

const rootReducer = combineReducers({
    admin: adminReducer
});
export default rootReducer;