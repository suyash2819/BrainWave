import { createSlice } from "@reduxjs/toolkit";

export const UserDetails = createSlice({
  name: "getUserDetails",
  initialState: {
    value: { name: "Ash" },
  },
  reducers: {},
});

export default UserDetails.reducer;
