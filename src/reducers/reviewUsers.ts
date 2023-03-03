import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type fetchReviewUser = {
  userDetails: { email: string; name: string; role: string }[];
  email: string[];
  messageLog: string;
  status: string;
};

const initialState: fetchReviewUser = {
  userDetails: [],
  email: [],
  messageLog: "",
  status: "",
};
export const reviewUser = createAsyncThunk("user/reviewUser", async () => {
  const userVerification = query(
    collection(db, "users"),
    where("isVerifiedByAdmin", "==", "pending")
  );
  const querySnapshot = await getDocs(userVerification);
  return querySnapshot;
});
const reviewUserSlice = createSlice({
  name: "useReviewUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reviewUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(reviewUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.userDetails.length = 0;
        state.email.length = 0;
        action.payload.docs.forEach(
          (doc: {
            data: () => {
              (): any;
              new (): any;
              email: string;
              firstname: string;
              lastname: string;
              role: string;
            };
          }) => {
            state.userDetails.push({
              email: doc.data().email,
              name: doc.data().firstname + " " + doc.data().lastname,
              role: doc.data().role,
            });
            state.email.push(doc.data().email);
          }
        );
      })
      .addCase(reviewUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog = action.error.message ? action.error.message : "";
      });
  },
});

export default reviewUserSlice.reducer;
