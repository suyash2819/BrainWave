import React, { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import "../RegPage/RegPage.scss";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

const LoginPage = () => {
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
          message: err.message,
          show: true,
          type: "",
        });
      });
  };

  return (
    <div className="logIn">
      <h3 className="logIn__Heading">Welcome! Please Login!</h3>
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
              minLength={7}
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              value={loginVals["email"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, email: e.target.value })
              }
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
              minLength={8}
              required
              value={loginVals["password"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, password: e.target.value })
              }
            />
          </div>
          <div className="regContainer__LogIn_button">
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
        </form>
        <button
          className="regContainer__form__submitButton regdirect_button"
          onClick={handleRegdirect}
        >
          <span className="regContainer__form__submitButton__text">
            Register
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
