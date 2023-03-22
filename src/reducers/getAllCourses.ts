import { db } from "../config/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IAllCourses,
  courseDetail,
} from "../pages/BrowseCourses/IPropsCourses";

const initialState: IAllCourses = {
  allCourseDetails: [],
  messageLog: "",
  status: "",
};
export const getAllCourses = createAsyncThunk(
  "user/getAllCourses",
  async () => {
    const docSnap = await getDocs(collection(db, "courses"));
    return docSnap;
  }
);
const getAllCoursesSlice = createSlice({
  name: "getAllCoursesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllCourses.fulfilled,
        (
          state,
          action: PayloadAction<
            QuerySnapshot<DocumentData>,
            string,
            { arg: void; requestId: string; requestStatus: "fulfilled" },
            never
          >
        ) => {
          state.status = "success";
          let tempCourseDetail: courseDetail[] = [];
          action.payload.forEach((doc: any) => {
            tempCourseDetail.push({
              title: doc.title,
              description: doc.description,
            });
          });
          state.allCourseDetails = tempCourseDetail;
        }
      )
      .addCase(getAllCourses.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog = action.error.message ? action.error.message : "";
      });
  },
});

export default getAllCoursesSlice.reducer;
