import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/getUserDetails";

const store = configureStore({
  reducer: { userLoginAPI: userLoginReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
