import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./CoursesView.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Spinner from "react-bootstrap/esm/Spinner";
import iulogo from "../../assets/iulogo.png";
import { componentToggle, modifyHeading } from "../../reducers/dasboardVals";

interface courseDetailsArr {
  courseDetailsarr: courseDetails[];
}

type courseDetails = {
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  title: string;
};

export default function CoursesView({ courseDetailsarr }: courseDetailsArr) {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const dispatchStore = useAppDispatch();
  return (
    <>
      <Row md={2} sm={1} lg={3} className="g-5 my-5 mx-3">
        {fetchCourses.coursesAbbrv &&
          courseDetailsarr.map((element, index: number) => (
            <Col key={index}>
              <Card
                style={{ width: "18rem" }}
                className="cardContainer"
                border="primary"
                onClick={() => {
                  dispatchStore(
                    componentToggle("subcourseview " + element.title)
                  );
                  dispatchStore(modifyHeading("Course Details"));
                }}
              >
                <Card.Img
                  variant="top"
                  src={iulogo}
                  style={{
                    height: "50px",
                    width: "50px",
                    alignItems: "center",
                  }}
                />
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text title={element.description} className="fst-italic">
                    {element.description.substring(0, 70) + "..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {!fetchCourses.coursesAbbrv.length &&
        fetchCourses.status !== "loading" ? (
          <h2>You're are not enrolled in any courses!</h2>
        ) : (
          <></>
        )}
      </Row>
      <div style={{ marginLeft: "50%" }}>
        {fetchCourses.status === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
