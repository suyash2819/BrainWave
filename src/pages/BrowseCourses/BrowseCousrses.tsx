import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getAllCourses,
  storeCoursesEnrollent,
} from "../../services/courseService";
import { courseDetail } from "./IPropsCourses";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { useAppSelector } from "../../hooks";
import Spinner from "react-bootstrap/esm/Spinner";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { IAlertProps } from "../../components/AlertMessage/IAlertProps";
import "./BrowseCourses.scss";

let tempCourseDetail: courseDetail[] = [];
export default function BrowseCousrses() {
  const [AllCourses, setAllCourses] = useState<courseDetail[]>([]);
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const [displayOnModal, setDisplayOnModal] = useState<courseDetail>({
    title: "",
    description: "",
    professor: "",
    sem: "",
    id: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [searchCourse, setSeachCourse] = useState<string>("");
  const coursesData = useAppSelector((state) => state.fetchCoursesReducer);
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const handleClose = () => setShow(false);
  const handleShow = (element: courseDetail) => {
    setDisplayOnModal(element);
    setShow(true);
  };

  const [showAlert, setShowAlert] = useState<IAlertProps>({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const fetchingCourses = async () => {
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      tempCourseDetail.push({
        title: dataDoc.title,
        description: dataDoc.description,
        professor: dataDoc.Instructor,
        sem: dataDoc.Semester,
        id: doc.id || "",
      });
    });
    if (userDataStore.role === "Professor") {
      tempCourseDetail = tempCourseDetail.filter(
        (e) => e.professor?.length === 0
      );
    }
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

  const handleEnrollement = () => {
    storeCoursesEnrollent(userDataStore.email, displayOnModal.id || "").then(
      (stored) => {
        console.log(stored);

        if (stored) {
          setShow(false);
          setShowAlert({
            success: true,
            message: `Enrollment request sent to admin`,
            show: true,
            type: "success",
          });
        } else {
          setShow(false);
          setShowAlert({
            success: false,
            message: `Some error occurred`,
            show: true,
            type: "danger",
          });
        }
      }
    );
  };

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

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
      {AllCourses.length || searchCourse.length ? (
        <div className="mb-5">
          <div className="m-5">
            <Form
              className={`d-flex ps-5 col-11 ${
                dashboardVals.darkMode === "dark" ? "text-white" : ""
              }`}
            >
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                style={{
                  backgroundColor:
                    dashboardVals.darkMode === "dark" ? "#212529" : "",
                  borderColor:
                    dashboardVals.darkMode === "dark" ? "white" : "white",
                  color: dashboardVals.darkMode === "dark" ? "white" : "",
                  borderWidth: "2px",
                  boxShadow:
                    dashboardVals.darkMode === "dark"
                      ? "1 2 5px white"
                      : "0 0 5px black",
                  fontSize: "20px",
                }}
                onChange={(e) => {
                  setSeachCourse(e.target.value);
                }}
              />
            </Form>
          </div>
          <div className="ms-5 col-10">
            <Card
              className={
                dashboardVals.darkMode === "dark"
                  ? "bg-dark text-white ms-5"
                  : "ms-5"
              }
            >
              <ListGroup variant="flush">
                {AllCourses.map((element, index) => (
                  <ListGroup.Item
                    className={
                      dashboardVals.darkMode === "dark"
                        ? "bg-dark text-white my-1 d-flex justify-content-between mt-2 shadow-white border-white"
                        : "my-1 d-flex justify-content-between mt-2 shadow-black border-dark"
                    }
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
      ) : userDataStore.role !== "Professor" ? (
        <div
          style={{
            marginLeft: "50%",
            marginTop: "20%",
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <></>
      )}
      {AllCourses.length === 0 && searchCourse.length ? (
        <h3 className="noCoursesTag">No courses found!</h3>
      ) : (
        <></>
      )}
      {userDataStore.role === "Professor" && searchCourse.length === 0 ? (
        <h3 className="noCoursesTag">All Courses are taken up!</h3>
      ) : (
        <></>
      )}

      {show ? (
        <Modal
          className="mt-5 ms-5 text-black"
          size="lg"
          show={show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header
            className={
              dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
            }
            onClick={handleClose}
            closeButton
          >
            <Modal.Title
              className={
                dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
              }
            >
              {displayOnModal.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={
              dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
            }
          >
            <p className="text-justify font-weight-light">
              {displayOnModal.description}
            </p>
            <p>Instuctor : {displayOnModal.professor}</p>
            <p>Semester : {displayOnModal.sem}</p>
          </Modal.Body>
          {userDataStore.role !== "Administrator" ? (
            <Modal.Footer
              className={
                dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
              }
            >
              {coursesData.courseDetails.indexOf(displayOnModal.title || "") >
              -1 ? (
                <Button disabled variant="primary">
                  You are Already Enrolled!
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEnrollement()}>
                  {userDataStore.role === "Professor"
                    ? "Request for taking course"
                    : "Enroll"}
                </Button>
              )}
            </Modal.Footer>
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
