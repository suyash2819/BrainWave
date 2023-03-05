import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type IfetchCourses = {
  coursesAbbrv: string[];
  //courseDetails: IfetchCourses[];
  messageLog: string;
  status: string;
};

const initialState: IfetchCourses = {
  coursesAbbrv: [],
  messageLog: "",
  status: "",
};
export const getUserCoursesApi = createAsyncThunk(
  "user/getUserCourses",
  async (email: string) => {
    const courseDoc = doc(db, "user_courses", email);
    const docSnap = await getDoc(courseDoc);
    if (docSnap.exists()) {
      return docSnap.data()["courses"];
    } else {
      return "no_courses";
    }
  }
);
const getUserCoursesSlice = createSlice({
  name: "getUserCoursesApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCoursesApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUserCoursesApi.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "success";
          state.coursesAbbrv = action.payload;
        }
      )
      .addCase(getUserCoursesApi.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog = action.error.message ? action.error.message : "";
      });
  },
});

export default getUserCoursesSlice.reducer;
