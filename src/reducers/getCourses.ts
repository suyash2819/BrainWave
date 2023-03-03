import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCourseDetails } from "../services/courseService";

type IfetchCourses = {
  coursesAbbrv: string[];
  courseDetails: {
    announcements: string[];
    assignments: string[];
    description: string | string[];
    syllabus: string | string[];
    title: string | string[];
  }[];
  messageLog: string;
  status: string;
};

const initialState: IfetchCourses = {
  coursesAbbrv: [],
  courseDetails: [],
  messageLog: "",
  status: "",
};
export const getUserCourses = createAsyncThunk(
  "user/getUserCourses",
  async (email: string) => {
    const courseDoc = doc(db, "user_courses", email);
    const docSnap = await getDoc(courseDoc);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()["courses"];
    } else {
      return "no_courses";
    }
  }
);
const getUserCoursesSlice = createSlice({
  name: "getUserCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUserCourses.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "success";
          action.payload.docs.forEach((course: string) => {
            getCourseDetails(course).then((data) => {
              state.courseDetails.push({
                announcements: data ? ["announcements"] : [],
                assignments: data ? ["assignments"] : [],
                description: data ? ["description"] : "",
                syllabus: data ? ["syllabus"] : "",
                title: data ? ["title"] : "",
              });
            });
          });
        }
      )
      .addCase(getUserCourses.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog = action.error.message ? action.error.message : "";
      });
  },
});

export default getUserCoursesSlice.reducer;
