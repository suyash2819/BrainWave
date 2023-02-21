import React, { useState } from "react";
import "./LoginPage.scss";
import "../RegPage/RegPage.scss";
import { auth } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import GoogleButton from "react-google-button";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  (function () {
    let forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event: React.ChangeEvent<HTMLInputElement>) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const passwordReset = () => {
    sendPasswordResetEmail(auth, loginVals.email)
      .then((s) => {
        // Password reset email sent!
        console.log(s);

        setShowAlert({
          success: true,
          message: "password reset mail sent",
          show: true,
          type: "",
        });
      })
      .catch((error) => {
        // ..
        console.log("reset err", error);

        setShowAlert({
          success: false,
          message:
            error.message === "Firebase: Error (auth/missing-email)."
              ? "Please fill the E-mail field on which link can be sent!"
              : error.message === "Firebase: Error (auth/invalid-email)."
              ? "Please enter correct E-mail on which link can be sent!"
              : error.message === "Firebase: Error (auth/user-not-found)."
              ? "User is not found! Please verify E-mail."
              : error.message,
          show: true,
          type: "",
        });
      });
  };

  const userSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginVals.email, loginVals.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log("user signed in");
          //
        } else {
          signOut(auth)
            .then(() => {
              setShowAlert({
                success: false,
                message:
                  "Please verify your email address from the link sent in mail by Brainwave!",
                show: true,
                type: "",
              });
            })
            .catch((err) => {
              // An error happened.
              setShowAlert({
                success: false,
                message: err.message,
                show: true,
                type: "",
              });
            });
        }
        // ...
      })
      .catch((err) => {
        console.log(err.message);
        setShowAlert({
          success: false,
          message:
            err.message === "Firebase: Error (auth/user-not-found)."
              ? "User is not Found, Please Register!"
              : err.message === "Firebase: Error (auth/internal-error)."
              ? "Something went wrong!"
              : err.message === "Firebase: Error (auth/wrong-password)."
              ? "Incorrect Password! Please check."
              : err.message,
          show: true,
          type: "danger",
        });
      });
  };

  return (
    <>
      <div className="logIn">
        <div className="brand__heading d-flex flex-row">
          <Link style={{ textDecoration: "none", color: "white" }} to="/Home">
            <p className="brand__heading__text">
              <img
                alt=""
                src={logo}
                width="50"
                height="50"
                className="d-inline-block p-1 m-3"
              />
              BrainWave
            </p>
          </Link>
        </div>
        <div className="logPageAlert">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
              type={showAlert.type}
            />
          ) : null}
        </div>

        <div className="logIn__Container">
          <h3 className="logIn__Heading mb-5">Welcome, Please Login!</h3>
          <form className="needs-validation" onSubmit={userSignIn} noValidate>
            <div className="col mx-5">
              <div className="row">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setLoginVals({ ...loginVals, email: e.target.value })
                  }
                />
                <div className="invalid-feedback">
                  Please enter valid Email!
                </div>
              </div>
              <div className="row mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  required
                  minLength={8}
                  onChange={(e) =>
                    setLoginVals({ ...loginVals, password: e.target.value })
                  }
                />
                <div className="invalid-feedback">
                  <small>Password should be atleast 8 characters</small>
                </div>
              </div>
              <div className="row mt-3">
                <button type="submit" className="btn btn-primary">
                  <span>Sign In</span>
                </button>
                <div className="d-flex flex-row justify-content-center  mt-3">
                  <small id="emailHelp" className="form-text text-muted me-2">
                    Not a user?
                  </small>
                  <Link
                    className="mt-1"
                    style={{ textDecoration: "none", fontSize: "0.9em" }}
                    to="/Registration"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </form>
          <GoogleButton
            className="regContainer__google_signin_button mt-3"
            onClick={() => passwordReset}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
