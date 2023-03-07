import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showComponent: "dashboard",
  heading: "Dashboard",
};
export const dashboardVals = createSlice({
  name: "dashboardVals",
  initialState,
  reducers: {
    componentToggle: (state, action) => {
      state.showComponent = action.payload;
    },
    modifyHeading: (state, action) => {
      state.heading = action.payload;
    },
    resetDashboardVals: () => initialState,
  },
});

export const { componentToggle, modifyHeading, resetDashboardVals } =
  dashboardVals.actions;

export default dashboardVals.reducer;
