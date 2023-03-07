import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./CoursesView.scss";
import { useAppSelector } from "../../hooks";

interface courseDetailsArr {
  courseDetailsarr: courseDetails[];
}

type courseDetails = {
  randomColor: string;
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  title: string;
};

export default function CoursesView({ courseDetailsarr }: courseDetailsArr) {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);

  return (
    <>
      <Row md={3} className="g-5 my-5 mx-3">
        {fetchCourses.coursesAbbrv &&
          courseDetailsarr.map((element, index: number) => (
            <Col key={index}>
              <Card className="cardContainer" border="primary">
                <Card.Body>
                  <div
                    style={{ backgroundColor: "#" + element.randomColor }}
                    className="cardContainer__bg"
                  ></div>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text title={element.description} className="">
                    {element.description.substring(0, 100) + "..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {!fetchCourses.coursesAbbrv.length ? (
          <h2>You're are not enrolled in any courses!</h2>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}
