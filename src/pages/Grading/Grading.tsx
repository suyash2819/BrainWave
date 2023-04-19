import React from "react";
import "./Grading.scss";
import { Alert, Button } from "react-bootstrap";
import { useAppSelector } from "../../hooks";

export default function Grading() {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  return (
    <>
      <div>
        {fetchCourses.courseDetails.map((element, index) => (
          <Alert
            key={index}
            className="m-3 d-flex flex-row justify-content-between"
            variant="info"
          >
            <p>{element}</p>
            <Button>OK</Button>
          </Alert>
        ))}
      </div>
    </>
  );
}
