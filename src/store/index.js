import { combineReducers, configureStore } from '@reduxjs/toolkit';
import inputSlice from './reducers/inputSlice';
import stateSlice from './reducers/stateSlice';

const reducer = combineReducers({
  inputSlice,
  stateSlice,
});

export const store = configureStore({
  reducer,
});
