import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAllCourses } from "../../services/courseService";
import { courseDetail } from "./IPropsCourses";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { useAppSelector } from "../../hooks";
import Spinner from "react-bootstrap/esm/Spinner";
import "./BrowseCourses.scss";

let tempCourseDetail: courseDetail[] = [];
export default function BrowseCousrses() {
  const [AllCourses, setAllCourses] = useState<courseDetail[]>([]);
  const [displayOnModal, setDisplayOnModal] = useState<courseDetail>({
    title: "",
    description: "",
    professor: "",
    sem: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [searchCourse, setSeachCourse] = useState<string>("");
  const coursesData = useAppSelector((state) => state.fetchCoursesReducer);
  const handleClose = () => setShow(false);
  const handleShow = (element: courseDetail) => {
    setDisplayOnModal(element);
    setShow(true);
  };

  const fetchingCourses = async () => {
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      tempCourseDetail.push({
        title: dataDoc.title,
        description: dataDoc.description,
        professor: dataDoc.Instructor,
        sem: dataDoc.Semester,
      });
    });
    setAllCourses(tempCourseDetail);
  };
  useEffect(() => {
    fetchingCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tempCourseDetail.length) {
      setAllCourses(tempCourseDetail);
    }
    if (searchCourse.length > 0) {
      const filteredCourses: courseDetail[] = tempCourseDetail.filter(
        (e) =>
          e.title?.toLowerCase().includes(searchCourse.toLowerCase()) ||
          e.professor?.toLowerCase().includes(searchCourse.toLowerCase())
      );
      setAllCourses(filteredCourses);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCourse]);
  return (
    <>
      {AllCourses.length || searchCourse.length ? (
        <div className="mb-5">
          <div className="m-5">
            <Form className="d-flex ps-5 col-11">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setSeachCourse(e.target.value);
                }}
              />
            </Form>
          </div>
          <div className="ms-5 col-10">
            <Card className="ms-5">
              <ListGroup variant="flush">
                {AllCourses.map((element, index) => (
                  <ListGroup.Item
                    className="my-1 d-flex justify-content-between"
                    key={index}
                  >
                    <p className="h5">{element.title}</p>
                    <Button
                      onClick={() => handleShow(element)}
                      variant="outline-primary"
                    >
                      View Details
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginLeft: "50%",
            marginTop: "20%",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}
      {AllCourses.length === 0 && searchCourse.length ? (
        <h3 className="noCoursesTag">No courses found!</h3>
      ) : (
        <></>
      )}

      {show ? (
        <Modal
          className="mt-5 ms-5"
          size="lg"
          show={show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header onClick={handleClose} closeButton>
            <Modal.Title>{displayOnModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-justify font-weight-light">
              {displayOnModal.description}
            </p>
            <p>Instuctor : {displayOnModal.professor}</p>
            <p>Semester : {displayOnModal.sem}</p>
          </Modal.Body>
          <Modal.Footer>
            {coursesData.courseDetails.indexOf(displayOnModal.title || "") >
            -1 ? (
              <Button disabled variant="primary">
                You are Already Enrolled!
              </Button>
            ) : (
              <Button variant="primary">Enroll</Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
