import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./CoursesView.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getCourseDetails } from "../../services/courseService";
import { modifyCourseDetails } from "../../reducers/getCourses";

type courseDetails = {
  randomColor: string;
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  title: string;
};

export default function CoursesView() {
  const dispatchStore = useAppDispatch();
  const [courseDetails, setCourseDetials] = useState<courseDetails[]>([]);
  let courseDetailsTemp: courseDetails[] = [];
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  useEffect(() => {
    fetchCourses.coursesAbbrv.forEach(async (e) => {
      const data = await getCourseDetails(e);
      courseDetailsTemp.push({
        randomColor: Math.floor(Math.random() * 16777215).toString(16),
        //@ts-ignore
        announcements: data["announcements"],
        //@ts-ignore
        assignments: data["assignments"],
        //@ts-ignore
        description: data["description"],
        //@ts-ignore
        syllabus: data["syllabus"],
        //@ts-ignore
        title: data["title"],
      });
      setCourseDetials(courseDetailsTemp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatchStore(modifyCourseDetails(courseDetails.map((e) => e.title)));
  }, [courseDetails]);
  console.log(courseDetails);

  return (
    <>
      <Row md={3} className="g-5 my-5 mx-3">
        {fetchCourses.coursesAbbrv &&
          courseDetails.map((element, index) => (
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
      </Row>
    </>
  );
}
