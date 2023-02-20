import React, { useState } from "react";
import GoogleButton from "react-google-button";
import "./RegPage.scss";
import RegInput from "../../components/RegPage/RegInput";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

const RegPage = () => {
  const [formVals, setFormVals] = useState({
    name: "",
    username: "",
    email: "",
    contactNo: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  //const navigate = useNavigate();
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const createUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formVals.email, formVals.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const euser = auth.currentUser;
        console.log("user created", user);
        if (euser === null) {
          console.log("null user");
        } else {
          sendEmailVerification(euser)
            .then(() => {
              // Email verification sent!
              setShowAlert({
                success: true,
                message: "Email Verification Sent at the provided Email",
                show: true,
                type: "",
              });
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  console.log("user signed out");
                })
                .catch((err) => {
                  // An error happened.
                  setShowAlert({
                    success: false,
                    message: err.message,
                    show: true,
                    type: "",
                  });
                  console.log(err);
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
              console.log(err);
            });
        }

        setFormVals({
          name: "",
          username: "",
          email: "",
          contactNo: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setShowAlert({
          success: false,
          message: err.message,
          show: true,
          type: "",
        });
        setFormVals({
          name: "",
          username: "",
          email: "",
          contactNo: "",
          password: "",
        });
      });
  };
  return (
    <>
      <div className="regContainer">
        <form className="regContainer__form">
          <h3 className="regContainer__Heading">Welcome, Please Register!</h3>
          <RegInput
            title="Firstname"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[A-Za-z]*"
            type={""}
          />
          <RegInput
            title="Lastname"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[A-Za-z]*"
            type={""}
          />
          <RegInput
            title="ContactNo"
            formVals={formVals}
            type="number"
            setFormVals={setFormVals}
            mandateText={false}
            pattern="[\d]{10}"
          />
          <RegInput
            title="Email"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            type={""}
          />
          <RegInput
            title="Username"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern=".+"
            type={""}
          />
          <RegInput
            title="Password"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            type="Password"
            pattern=".+"
          />
          <div className="mt-4">
            {" "}
            <Link to="/LogIn">
              <button className="regContainer__form__submitButton ms-3">
                <span className="regContainer__LogIn_button__text">
                  Sign in Instead?
                </span>
              </button>
            </Link>
            <button
              aria-label="RegisterButton"
              className="regContainer__form__submitButton ms-5"
              id="registerButton"
              type="submit"
              onClick={createUser}
            >
              <span className="regContainer__form__submitButton__text">
                Register
              </span>
            </button>
          </div>

          <GoogleButton
            className="regContainer__google_signin_button mt-5"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </form>

        <div>
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
              type=""
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default RegPage;
