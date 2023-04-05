import React from "react";
import { useAppSelector } from "../../hooks";
import "./UserAccount.scss";

export default function UserAccount() {
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const coursesData = useAppSelector((state) => state.fetchCoursesReducer);

  return (
    <div className="account-table mx-5 px-5">
      <table>
        <tbody>
          <tr>
            <td>Firstname:</td>
            <td>{userDetails.firstname}</td>
          </tr>
          <tr>
            <td>Lastname:</td>
            <td>{userDetails.lastname}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{userDetails.email}</td>
          </tr>
          <tr>
            <td>Username:</td>
            <td>{userDetails.username}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{userDetails.role}</td>
          </tr>
          <tr>
            <td>University ID:</td>
            <td>{userDetails.uid}</td>
          </tr>
          {userDetails.role !== "Administrator" ? (
            <tr>
              <td>Courses Enrolled:</td>
              <td>
                <ul>
                  {coursesData.courseDetails.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}
