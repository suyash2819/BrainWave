import React, { useEffect, useState } from "react";
import "./LoginPage.scss";
import "../RegPage/RegPage.scss";
import { auth } from "../../config/firebase";
import {
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import GoogleButton from "react-google-button";
import logo from "../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogIn } from "../../reducers/getUserDetails";
import { modifyEmail } from "../../reducers/getUserDetails";
import { IAlertProps } from "../../components/AlertMessage/IAlertProps";
import { getUserSpecificDetails } from "../../services/userService";
import { signOut } from "firebase/auth";

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
  const dispatchLoginDetails = useAppDispatch();
  const navigate = useNavigate();
  const [forgotpswd, setForgotpwd] = useState<boolean>(false);
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });
  const userLoginlog = useAppSelector((state) => state.userLoginAPI);
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };
  const [showAlert, setShowAlert] = useState<IAlertProps>({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const passwordReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, loginVals.email)
      .then((s) => {
        // Password reset email sent!
        console.log(s);

        setShowAlert({
          success: true,
          message: "Link to reset password is sent!",
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

  const UserSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("bwUser");
      // navigate("/login");
    } catch (err) {
      console.log("err.message");
    }
  };

  const userGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential.accessToken;
        // The signed-in user info.
        console.log(result.user);
        navigate("/Dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        setShowAlert({
          success: false,
          message: error.message,
          show: true,
          type: "",
        });
        console.log(error);

        // ...
      });
  };

  useEffect(() => {
    setShowAlert({
      success: false,
      message: userLoginlog.messageLog,
      show: userLoginlog.messageLog?.length ? true : false,
      type: userLoginlog.status === "Error" ? "danger" : "",
    });
    if (userLoginlog.status === "success") {
      getUserSpecificDetails(userLoginlog.email)
        .then((querySnapshot) => {
          if (querySnapshot && !querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data["isVerifiedByAdmin"]) {
                navigate("/dashboard");
              } else {
                UserSignOut();
                throw new Error("User is not verified by admin");g
              }
            });
          } else {
            throw new Error("User not found");
          }
        })
        .catch((e) => {
          // console.log(e);
          setShowAlert({
            success: false,
            message: e.message,
            show: true,
            type: "danger",
          });
        });
    }
  }, [userLoginlog, navigate]);

  const useSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatchLoginDetails(modifyEmail(loginVals.email));
    dispatchLoginDetails(userLogIn(loginVals));
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
                width="60"
                height="60"
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
          {forgotpswd ? (
            <FontAwesomeIcon
              onClick={() => setForgotpwd(false)}
              className="h3 text-wheat"
              icon={faArrowLeft}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <></>
          )}
          <h3 className="logIn__Heading mb-5">
            {forgotpswd ? "Password Reset" : "Welcome, Please Login!"}
          </h3>
          <form
            className="needs-validation"
            onSubmit={forgotpswd ? passwordReset : useSignIn}
            noValidate
          >
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
              {!forgotpswd ? (
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
              ) : (
                <></>
              )}
              <div className="row mt-3">
                <button type="submit" className="btn btn-primary">
                  <span>{!forgotpswd ? "Sign In" : "Send Link"}</span>
                </button>
                {!forgotpswd ? (
                  <div className="d-flex flex-row justify-content-center  mt-3">
                    <small
                      id="emailHelp"
                      style={{ cursor: "pointer" }}
                      onClick={() => setForgotpwd(true)}
                      className="form-text text-muted me-2 link"
                    >
                      Forgot Password?
                    </small>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
          <GoogleButton
            className="regContainer__google_signin_button mt-3"
            onClick={() => {
              userGoogleSignIn();
            }}
          />
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
    </>
  );
};

export default LoginPage;
