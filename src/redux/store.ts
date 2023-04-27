import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, slice);

const store = configureStore({
  reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
