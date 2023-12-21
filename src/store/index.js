import { combineReducers, configureStore } from '@reduxjs/toolkit';
import inputSlice from './reducers/inputSlice';

const reducer = combineReducers({
  inputSlice,
});

export const store = configureStore({
  reducer,
});
