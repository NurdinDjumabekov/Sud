import { combineReducers, configureStore } from '@reduxjs/toolkit';
import inputSlice from './reducers/inputSlice';
import stateSlice from './reducers/stateSlice';
import typesSlice from './reducers/typesSlice';

const reducer = combineReducers({
  inputSlice,
  stateSlice,
  typesSlice,
});

export const store = configureStore({
  reducer,
});
