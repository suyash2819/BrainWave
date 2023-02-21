import React, { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import "../RegPage/RegPage.scss";
import { auth } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import GoogleButton from "react-google-button";

const LoginPage = () => {
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //dispatchLoginDetails(userLogIn(JSON.stringify(loginVals)));
    console.log(loginVals);
    // navigate(0);
    // navigate("/Dashboard");
  }

  const handleRegdirect = () => {
    navigate("/Registration");
  };

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const passwordReset = () => {
    console.log("yes", loginVals.email);

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
          message: error.message,
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
          setShowAlert({
            success: true,
            message: "sign in successful",
            show: true,
            type: "",
          });
          setLoginVals({
            email: "",
            password: "",
          });
        } else {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              setShowAlert({
                success: false,
                message: "please verify email address",
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
        setShowAlert({
          success: false,
          message:
            err.message === "Firebase: Error (auth/invalid-email)."
              ? "Please enter the proper Email!"
              : err.message === "Firebase: Error (auth/user-not-found)."
              ? "User is not Found, Please register!"
              : err.message === "Firebase: Error (auth/internal-error)."
              ? "Incorrect password, Please verify"
              : "",
          show: true,
          type: "danger",
        });
        if (err.message === "Firebase: Error (auth/internal-error).") {
          setShowPasswordError(true);
        } else if (err.message === "Firebase: Error (auth/invalid-email).") {
          setShowEmailError(true);
        }
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals({ ...loginVals, email: e.target.value });
    setShowEmailError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals({ ...loginVals, password: e.target.value });
    setShowPasswordError(false);
  };

  return (
    <>
      <div className="logIn">
        <h3 className="logIn__Heading">Welcome , Please Login!</h3>
        <div className="logIn__Container">
          <form className="logIn__Container__form" onSubmit={handleLogin}>
            <div className="logIn__Container__form__element">
              <label
                className={"logIn__Container__form__element__label mandateText"}
              >
                Email:
              </label>
              <input
                className="regContainer__form__element__input"
                type="text"
                name="Email"
                id="Email"
                style={{
                  borderColor: showEmailError ? "red" : "",
                }}
                value={loginVals["email"]}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className="logIn__Container__form__element">
              <label className="logIn__Container__form__element__label mandateText">
                Password:
              </label>
              <input
                className="regContainer__form__element__input"
                type="password"
                name="Password"
                id="Password"
                style={{
                  borderColor: showPasswordError ? "red" : "",
                }}
                value={loginVals["password"]}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className="forgot_pwd">
              <p
                className="pwd_link"
                onClick={() => {
                  passwordReset();
                }}
              >
                Forgot password?
              </p>
            </div>
          </form>

          <div className="d-flex flex-row">
            <button
              className="regContainer__form__submitButton"
              onClick={handleRegdirect}
            >
              <span className="regContainer__form__submitButton__text">
                Not a user? Register
              </span>
            </button>

            <div className="regContainer__LogIn_button ms-5">
              <button
                className="regContainer__form__submitButton"
                onClick={userSignIn}
              >
                <span
                  aria-label="LoginButton"
                  className="regContainer__form__submitButton__text"
                >
                  Log In
                </span>
              </button>
            </div>
          </div>
          <GoogleButton
            className="regContainer__google_signin_button mt-5"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </div>
        <div>
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
              type={showAlert.type}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
