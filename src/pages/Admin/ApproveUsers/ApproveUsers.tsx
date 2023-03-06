import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reviewUser } from "../../../reducers/reviewUsers";
import "./ApproveUsers.scss";
import { approveUser } from "../../../services/userService";
import { IAlertProps } from "../../../components/AlertMessage/IAlertProps";
import AlertMessage from "../../../components/AlertMessage/AlertMessage";
import { Spinner } from "react-bootstrap";

export default function ApproveUsers() {
  const dispatchFetchUsers = useAppDispatch();
  const getPendingUsers = useAppSelector((state) => state.reviewUserReducer);
  useEffect(() => {
    dispatchFetchUsers(reviewUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const handleReviewButton = (email: string, decision: string) => {
    approveUser(email, decision);
    dispatchFetchUsers(reviewUser());
    console.log(decision === "reject" ? "danger" : "success");
    setShowAlert({
      success: false,
      message: email + " is now " + decision + "!",
      show: true,
      type: decision === "reject" ? "danger" : "success",
    });
  };
  const [showAlert, setShowAlert] = useState<IAlertProps>({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  return (
    <>
      <div className="approvePageAlert">
        {showAlert.show ? (
          <AlertMessage
            success={showAlert.success}
            message={showAlert.message}
            alertDisplay={alertMessageDisplay}
            type={showAlert.type}
          />
        ) : null}
      </div>
      <div className="m-5 ">
        {getPendingUsers.status === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <></>
        )}
        {getPendingUsers.userDetails.length ? (
          <Table className="approveUsers__container" striped bordered>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getPendingUsers.userDetails.map((element, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.email}</td>
                  <td>{element.name}</td>
                  <td>{element.role ? element.role : "N/A"}</td>
                  <td className="text-center">
                    {" "}
                    <Button
                      onClick={() =>
                        handleReviewButton(element.email, "approve")
                      }
                      className="mx-4"
                      variant="outline-primary"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() =>
                        handleReviewButton(element.email, "reject")
                      }
                      variant="outline-secondary"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <></>
        )}
        {getPendingUsers.status !== "loading" &&
        !getPendingUsers.userDetails.length ? (
          <h1>There are no pending users!</h1>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
