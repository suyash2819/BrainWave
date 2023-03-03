import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducers/getUserDetails";
import dashboardValsReducer from "./reducers/dasboardVals";
import reviewUserReducer from "./reducers/reviewUsers";
import fetchUserReducer from "./reducers/getCourses";

const store = configureStore({
  reducer: {
    userLoginAPI: userLoginReducer,
    dashboardValsReducer: dashboardValsReducer,
    reviewUserReducer: reviewUserReducer,
    fetchCoursesReducer: fetchUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
