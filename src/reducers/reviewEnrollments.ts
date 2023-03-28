import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCoursesEnrollments } from "../services/courseService";

type IfetchEnrollments = {
  courseDetails: { email: string; allCourses: string[] }[];
  messageLog: string;
  status: string;
};

const initialState: IfetchEnrollments = {
  courseDetails: [],
  messageLog: "",
  status: "",
};

export const reviewEnrollments = createAsyncThunk(
  "user/reviewEnrollments",
  () => {
    const docSnap = getAllCoursesEnrollments();
    return docSnap;
  }
);
const reviewEnrollmentsSlice = createSlice({
  name: "useReviewEnrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reviewEnrollments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        reviewEnrollments.fulfilled,
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
          state.courseDetails = [];
          action.payload.forEach((doc: any) => {
            console.log(doc.data(), doc.id);
            state.courseDetails.push({
              email: doc.id,
              allCourses: doc.data().courses,
            });
          });
        }
      )
      .addCase(reviewEnrollments.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog = action.error.message ? action.error.message : "";
      });
  },
});

export default reviewEnrollmentsSlice.reducer;
