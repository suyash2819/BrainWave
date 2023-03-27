import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Announcement } from "./IAnnouncementProps";
import { Assignment } from "../components/Assignments/IAssignments";

type IfetchCourses = {
  coursesAbbrv: string[];
  courseDetails: string[];
  messageLog: string;
  status: string;
  allAnnouncements: Announcement[];
  assignment: Assignment[];
};

const initialState: IfetchCourses = {
  allAnnouncements: [],
  courseDetails: [],
  coursesAbbrv: [],
  messageLog: "",
  status: "",
  assignment: [],
};
export const getUserCoursesApi = createAsyncThunk(
  "user/getUserCourses",
  async (email: string) => {
    const courseDoc = doc(db, "user_courses", email);
    const docSnap = await getDoc(courseDoc);
    if (docSnap.exists()) {
      return docSnap.data()["courses"];
    } else {
      return [];
    }
  }
);
const getUserCoursesSlice = createSlice({
  name: "getUserCoursesApi",
  initialState,
  reducers: {
    modifyCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    modifyAnnouncements: (state, action) => {
      state.allAnnouncements = action.payload;
    },
    modifyAssignments: (state, action) => {
      state.assignment = action.payload;
    },
    resetCourseData: (state) => {
      state.allAnnouncements = [];
      state.courseDetails = [];
      state.coursesAbbrv = [];
      state.status = "";
      state.messageLog = "";
    },
  },
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
export const {
  modifyCourseDetails,
  modifyAnnouncements,
  resetCourseData,
  modifyAssignments,
} = getUserCoursesSlice.actions;
export default getUserCoursesSlice.reducer;
