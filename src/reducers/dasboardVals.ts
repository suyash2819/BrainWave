import { createSlice } from "@reduxjs/toolkit";
export const dashboardVals = createSlice({
  name: "dashboardVals",
  initialState: {
    showComponent: "dashboard",
    heading: "Dashboard",
  },
  reducers: {
    componentToggle: (state, action) => {
      state.showComponent = action.payload;
    },
    modifyHeading: (state, action) => {
      state.heading = action.payload;
    },
  },
});

export const { componentToggle, modifyHeading } = dashboardVals.actions;

export default dashboardVals.reducer;
