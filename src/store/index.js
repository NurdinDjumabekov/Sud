import { combineReducers, configureStore } from '@reduxjs/toolkit';
import inputSlice from './reducers/inputSlice';
import stateSlice from './reducers/stateSlice';
import typesSlice from './reducers/typesSlice';
import requestSlice from './reducers/requestSlice';

const reducer = combineReducers({
  inputSlice,
  stateSlice,
  typesSlice,
  requestSlice,
});

export const store = configureStore({
  reducer,
});
