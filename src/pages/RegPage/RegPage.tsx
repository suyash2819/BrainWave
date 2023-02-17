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

//import axios from "axios";

const RegPage = () => {
  const [formVals, setFormVals] = useState({
    name: "",
    username: "",
    email: "",
    contactNo: "",
    password: "",
  });
  //const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const result = await axios.post(
    //   "https://api-nodejs-todolist.herokuapp.com/user/register",
    //   JSON.stringify(formVals),
    //   { headers: { "Content-Type": "application/json" } }
    // );
    // if (result.status === 201) {
    //   localStorage.setItem("sessionkey", result.data.token);
    //   navigate(0);
    //   navigate("/DashBoard");
    // }
  }

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
      <div className="regContainer">
        <form className="regContainer__form" onSubmit={handleSubmit}>
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
