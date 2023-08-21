import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../modules/userSlice";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;