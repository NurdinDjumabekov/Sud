import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//// slice
import inputSlice from "./reducers/inputSlice";
import stateSlice from "./reducers/stateSlice";
import typesSlice from "./reducers/typesSlice";
import applicationsSlice from "./reducers/applicationsSlice";
import sendDocsSlice from "./reducers/sendDocsSlice";
import saveDataSlice from "./reducers/saveDataSlice";
import selectsSlice from "./reducers/selectsSlice";
import authSlice from "./reducers/authSlice";
import notificationSlice from "./reducers/notificationSlice";

const reducer = combineReducers({
  inputSlice,
  stateSlice,
  typesSlice,
  applicationsSlice,
  sendDocsSlice,
  saveDataSlice,
  selectsSlice,
  authSlice,
  notificationSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["saveDataSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export { store };
