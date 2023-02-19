import React, { useState } from "react";
import GoogleButton from 'react-google-button'
import "./RegPage.scss";
import RegInput from "../../components/RegPage/RegInput";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
    

const RegPage = () => {

  const [formVals, setFormVals] = useState({
    name: "",
    username: "",
    email: "",
    contactNo: "",
    password: "",
  });
  //const navigate = useNavigate();
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
              // ...
              console.log("email sent");
              signOut(auth)
                .then(() => {
                  // Sign-out successful.

                  console.log("user signed out");
                })
                .catch((err) => {
                  // An error happened.
                  console.log(err);
                });
            })
            .catch((err) => {
              // An error happened.
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

      <div className="googleSignInButton"></div>

      <div className="regContainer">
        <form className="regContainer__form">
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

          <GoogleButton className="regContainer__google_signin_button"
            onClick={() => { console.log('Google button clicked') }}
          />

          <Link to="/LogIn">
          <button className="regContainer__LogIn_button">
            <span className="regContainer__LogIn_button__text">
              Sign in instead
            </span>
          </button>
        </Link>
          
        </form>
      </div>
    </>
  );
};

export default RegPage;
