import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserCourses } from "../../reducers/getCourses";

export default function CoursesView() {
  const dispatchFetchUsers = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  useEffect(() => {
    dispatchFetchUsers(getUserCourses(userDetails.email));
  }, [dispatchFetchUsers]);
  return (
    <div>
      {fetchCourses.courseDetails.map((e) => (
        <div>{e.description}</div>
      ))}
    </div>
  );
}
