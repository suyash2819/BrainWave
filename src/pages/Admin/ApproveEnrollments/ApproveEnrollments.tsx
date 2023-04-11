import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reviewEnrollments } from "../../../reducers/reviewEnrollments";
import { approveUserEnrollment } from "../../../services/userService";
import { IAlertProps } from "../../../components/AlertMessage/IAlertProps";
import AlertMessage from "../../../components/AlertMessage/AlertMessage";
import { Spinner } from "react-bootstrap";

export default function ApproveEnrollments() {
  let indexing = 0;
  const dispatchFetchEnrollment = useAppDispatch();
  const getPendingEnrollments = useAppSelector(
    (state) => state.reviewEnrollmentReducer
  );
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  useEffect(() => {
    dispatchFetchEnrollment(reviewEnrollments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const handleReviewButton = async (
    email: string,
    decision: string,
    course: string
  ) => {
    await approveUserEnrollment(email, decision, course);
    dispatchFetchEnrollment(reviewEnrollments());
    console.log(decision === "rejected" ? "danger" : "success");
    setShowAlert({
      success: false,
      message: `Enrollment in subject ${course} for ${email} is now ${decision}!`,
      show: true,
      type: decision === "rejected" ? "danger" : "success",
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
        {getPendingEnrollments.status === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <></>
        )}
        {getPendingEnrollments.courseDetails.length ? (
          <Table
            className={
              dashboardVals.darkMode === "dark"
                ? " text-white table-bordered approveUsers__container"
                : " table-bordered approveUsers__container"
            }
            striped
            bordered
          >
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getPendingEnrollments.courseDetails.map((element) =>
                element.allCourses.map((course: string, index: number) => {
                  indexing += 1;
                  return (
                    <tr key={index}>
                      <td>{indexing}</td>
                      <td>{element.email}</td>
                      <td>{course}</td>
                      <td className="text-center">
                        {" "}
                        <Button
                          onClick={() =>
                            handleReviewButton(
                              element.email,
                              "approved",
                              course
                            )
                          }
                          className="mx-4"
                          variant="outline-primary"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            handleReviewButton(
                              element.email,
                              "rejected",
                              course
                            )
                          }
                          variant="outline-secondary"
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        ) : (
          <></>
        )}
        {getPendingEnrollments.status !== "loading" &&
        !getPendingEnrollments.courseDetails.length ? (
          <h1>There are no pending enrollments!</h1>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
