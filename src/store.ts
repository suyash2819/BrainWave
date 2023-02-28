import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/getUserDetails";
import dashboardValsReducer from "./reducers/dasboardVals";

const store = configureStore({
  reducer: {
    userLoginAPI: userLoginReducer,
    dashboardValsReducer: dashboardValsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
