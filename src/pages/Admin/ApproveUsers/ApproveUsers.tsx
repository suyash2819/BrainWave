import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reviewUser } from "../../../reducers/reviewUsers";
import "./ApproveUsers.scss";
import { approveUser } from "../../../services/userService";

export default function ApproveUsers() {
  const dispatchFetchUsers = useAppDispatch();
  const getPendingUsers = useAppSelector((state) => state.reviewUserReducer);
  useEffect(() => {
    dispatchFetchUsers(reviewUser());
  }, [dispatchFetchUsers]);

  const handleReviewButton = (email: string, decision: string) => {
    approveUser(email, decision);
  };
  return (
    <>
      <div className="m-5 ">
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
                    onClick={() => handleReviewButton(element.email, "approve")}
                    className="mx-4"
                    variant="outline-primary"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReviewButton(element.email, "reject")}
                    variant="outline-secondary"
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
