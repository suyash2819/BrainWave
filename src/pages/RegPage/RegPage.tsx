import React, { useState } from "react";
import "./RegPage.scss";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import {
  storeUserDetails,
  getUserCount,
  checkUniqueUsername,
} from "../../services/userService";
import logo from "../../assets/logo.jpeg";
import Form from "react-bootstrap/Form";

const RegPage = () => {
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
  const [formVals, setFormVals] = useState({
    firstname: "",
    lastname: "",
    username: "",
    role: "",
    email: "",
    password: "",
  });
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const createUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const checkUser = checkUniqueUsername(formVals.username);
    checkUser
      .then((count) => {
        console.log("user count", count);
        if (count === undefined) {
          console.log("count is undefined");
        } else if (count > 0) {
          setShowAlert({
            success: false,
            message: "username already in use",
            show: true,
            type: "",
          });
        } else {
          createUserWithEmailAndPassword(
            auth,
            formVals.email,
            formVals.password
          )
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
                      message:
                        "Email Verification sent! Please check your Email",
                      show: true,
                      type: "",
                    });
                    getUserCount().then((totalUsers) => {
                      storeUserDetails({
                        ...formVals,
                        isVerifiedByAdmin: "pending",
                        uid: 200001 + totalUsers,
                      });
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
                firstname: "",
                lastname: "",
                username: "",
                role: "",
                email: "",
                password: "",
              });
            })
            .catch((err) => {
              console.log(err);
              setShowAlert({
                success: false,
                message:
                  err.message === "Firebase: Error (auth/invalid-email)."
                    ? "Please enter correct E-mail on which link can be sent!"
                    : err.message ===
                      "Firebase: Error (auth/email-already-in-use)."
                    ? "Email is already in use!"
                    : err.message,
                show: true,
                type: "",
              });
              setFormVals({
                firstname: "",
                lastname: "",
                username: "",
                role: "",
                email: "",
                password: "",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="regContainer">
        <div className="brand__heading__reg d-flex flex-row">
          <Link style={{ textDecoration: "none", color: "white" }} to="/Home">
            <p className="brand__heading__reg__text">
              {" "}
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
        <div className="regPageAlert">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
              type=""
            />
          ) : null}
        </div>
        <div className="regContainer__form">
          <h3 className="regContainer__Heading mt-1">
            Welcome, Please Register!
          </h3>
          <div className="d-flex flex-row justify-content-between">
            <div className="col-12 mb-3">
              {" "}
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setFormVals({ ...formVals, role: e.target.value });
                }}
              >
                <option>Select the role...</option>
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
                <option value="Administrator">Administrator</option>
              </Form.Select>
            </div>
          </div>
          <form className="needs-validation" onSubmit={createUser} noValidate>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  required={true}
                  onChange={(e) =>
                    setFormVals({ ...formVals, firstname: e.target.value })
                  }
                />
                <div className="invalid-feedback">First Name is required!</div>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  required
                  onChange={(e) =>
                    setFormVals({ ...formVals, lastname: e.target.value })
                  }
                />
                <div className="invalid-feedback">Last Name is required!</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setFormVals({ ...formVals, email: e.target.value })
                  }
                />
                <div className="invalid-feedback">
                  Please enter valid Email!
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-2">
                  {" "}
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Username"
                    required
                    onChange={(e) =>
                      setFormVals({ ...formVals, username: e.target.value })
                    }
                  />
                  <div className="invalid-feedback">UserName is required!</div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  required
                  minLength={8}
                  onChange={(e) =>
                    setFormVals({ ...formVals, password: e.target.value })
                  }
                />
                <div className="invalid-feedback">
                  <small>Password should be atleast 8 characters</small>
                </div>
              </div>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  minLength={8}
                  required
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordConf(e.target.value)}
                />
                {passwordConf !== formVals.password &&
                formVals.password.length > 7 &&
                passwordConf.length > 7 ? (
                  <small style={{ color: "red" }}>Passwords don't match!</small>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center mt-4">
              <button type="submit" className="btn btn-primary px-5">
                <span>Register</span>
              </button>
              <div className="d-flex flex-row justify-content-center  mt-3">
                <small id="emailHelp" className="form-text text-muted me-2">
                  Already have an account?
                </small>
                <Link
                  className="mt-1"
                  style={{ textDecoration: "none", fontSize: "0.9em" }}
                  to="/LogIn"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
          <div className="m-3"></div>
        </div>
      </div>
    </>
  );
};

export default RegPage;
