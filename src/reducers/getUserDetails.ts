import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { IUserProps } from "./IUserProps";

const initialState: IUserProps = {
  email: "",
  loginToken: "",
  status: "",
  messageLog: "",
  firstname: "",
  lastname: "",
  username: "",
  role: "",
  uid: 0,
};

export const userLogIn = createAsyncThunk(
  "user/login",
  async (loginVals: { email: string; password: string }) => {
    const response = await signInWithEmailAndPassword(
      auth,
      loginVals.email,
      loginVals.password
    );
    return response;
  }
);

const userSlice = createSlice({
  name: "useUserLogin",
  initialState,
  reducers: {
    modifyEmail: (state, action) => {
      state.email = action.payload;
    },
    modifyFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    modifyLastname: (state, action) => {
      state.lastname = action.payload;
    },
    modifyUsername: (state, action) => {
      state.username = action.payload;
    },
    modifyRole: (state, action) => {
      state.role = action.payload;
    },
    modifyUID: (state, action) => {
      state.uid = action.payload;
    },
    modifyStatusLogout: (state, action) => {
      state.status = action.payload;
    },
    resetAllUserDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogIn.fulfilled, (state, action: PayloadAction<any>) => {
        const user = action.payload.user;
        if (user.emailVerified) {
          user?.getIdToken().then(function (token: string) {
            localStorage.setItem("bwUser", token);
          });
          localStorage.setItem("uuid", state.email);
          state.status = "success";
        } else {
          signOut(auth);
          state.messageLog =
            "Please verify your email address from the link sent in mail by Brainwave!";
          state.status = "";
        }
      })
      .addCase(userLogIn.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "Error";
        state.messageLog =
          action.error.message === "Firebase: Error (auth/user-not-found)."
            ? "User is not Found, Please Register!"
            : action.error.message === "Firebase: Error (auth/internal-error)."
            ? "Something went wrong!"
            : action.error.message === "Firebase: Error (auth/wrong-password)."
            ? "Incorrect Password! Please check."
            : action.error.message;
      });
  },
});

export const {
  modifyEmail,
  modifyFirstname,
  modifyLastname,
  modifyUsername,
  modifyRole,
  modifyUID,
  modifyStatusLogout,
  resetAllUserDetails,
} = userSlice.actions;
export default userSlice.reducer;
