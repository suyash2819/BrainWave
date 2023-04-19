import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allSubmittedAssignments: [],
};
export const allSubmittedAssignmentsVals = createSlice({
  name: "dashboardVals",
  initialState,
  reducers: {
    modifyallSubmittedAssignments: (state, action) => {
      state.allSubmittedAssignments = action.payload;
    },
  },
});

export const { modifyallSubmittedAssignments } =
  allSubmittedAssignmentsVals.actions;

export default allSubmittedAssignmentsVals.reducer;
