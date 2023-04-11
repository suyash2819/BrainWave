import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showComponent: "dashboard",
  heading: "Dashboard",
  darkMode: "light",
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
    modifyDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    resetDashboardVals: () => initialState,
  },
});

export const {
  componentToggle,
  modifyHeading,
  resetDashboardVals,
  modifyDarkMode,
} = dashboardVals.actions;

export default dashboardVals.reducer;
