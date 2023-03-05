import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserCoursesApi } from "../../reducers/getCourses";
import { getCourseDetails } from "../../services/courseService";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type courseDetails = {
  announcements: string[];
  assignments: string[];
  description: string | string[];
  syllabus: string | string[];
  title: string;
};

export default function CoursesView() {
  const dispatchFetchUsers = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const [courseDetails, setCourseDetials] = useState<courseDetails[]>([]);

  let tempCourseData: courseDetails[] = [];
  const userEmail: string = localStorage.getItem("uuid") || "";
  useEffect(() => {
    dispatchFetchUsers(
      getUserCoursesApi(userDetails.email ? userDetails.email : userEmail)
    );
    console.log(fetchCourses.coursesAbbrv);
    fetchCourses.coursesAbbrv.map((course) => {
      console.log(course);
      getCourseDetails(course).then((data: any) => {
        console.log(data);
        tempCourseData.push({
          announcements: data["announcements"],
          assignments: data["assignments"],
          description: data["description"],
          syllabus: data["syllabus"],
          title: data["title"],
        });
      });
    });

    setCourseDetials(tempCourseData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row md={3} className="g-5 my-5 mx-3">
        {courseDetails.map((element, index) => (
          <Col key={index}>
            <Card border="primary">
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text>{element.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
