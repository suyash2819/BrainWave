import React, { useState } from "react";
import "./RegPage.scss";
import RegInput from "../../components/RegPage/RegInput";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage";

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
          <RegInput
            title="Name"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[A-Za-z]*"
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
            title="Email"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
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
            title="Password"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            type="Password"
            pattern=".+"
          />
          <button
            aria-label="RegisterButton"
            className="regContainer__form__submitButton"
            id="registerButton"
            type="submit"
            onClick={createUser}
          >
            <span className="regContainer__form__submitButton__text">
              Register
            </span>
          </button>
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
      <div className="regContainer__LogIn_button">
        <Link to="/LogIn">
          <button className="regContainer__form__submitButton">
            <span className="regContainer__form__submitButton__text">
              Log In
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default RegPage;
