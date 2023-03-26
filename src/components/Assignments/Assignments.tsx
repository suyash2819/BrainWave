import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { v4 as uuidv4 } from "uuid";
import { Assignment, courseDetailI } from "./IAssignments";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { storeCourseAssignment } from "../../services/assignmentService";
import Card from "react-bootstrap/esm/Card";
import { Button, ListGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { modifyAssignments } from "../../reducers/getCourses";

export default function Assignments({
  subCourseCode,
  courseDetailAssign,
  subCourseFullHeading,
}: courseDetailI) {
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const [Assignment, setAssignment] = useState<Assignment>({
    name: "",
    description: "",
    courseName: subCourseCode,
    courseFullName: subCourseFullHeading,
    deadlineDate: "",
    file: "",
    datePosted: new Date().toISOString(),
  });

  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = Assignment;

  const [assignmentFile, setAssignmentFile] = useState<File>();
  const [displayOnModal, setDisplayOnModal] = useState<Assignment>();
  const dispatchStore = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const [submittedAssignments, setSubmittedAssignments] =
    useState<Assignment>();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAssignment((prevState) => ({
      ...prevState,
      [name]: value,
      courseName: subCourseCode,
    }));
    console.log(Assignment);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileSubmission = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setAssignmentFile(event.target.files[0] as File);
    }
    const storage = getStorage();
    const storageRef = ref(
      storage,
      courseDetailAssign.title + "/" + assignmentFile?.name
    );
    const file = event.target.files!;
    uploadBytes(storageRef, file[0]).then(() => {
      console.log(file);
      getDownloadURL(
        ref(storage, courseDetailAssign.title + "/" + assignmentFile?.name)
      ).then((url) => {
        console.log(url);
        setSubmittedAssignments({
          name: Assignment.name,
          description: Assignment.description,
          deadlineDate: Assignment.deadlineDate,
          courseName: subCourseCode,
          courseFullName: subCourseFullHeading,
          file: url,
        });
      });
    });
  };

  const handleAssignmentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    storeCourseAssignment(submittedAssignments!)
      .then((res) => {
        console.log(res);
        setAssignment({ ...Assignment, file: "" });
        setAssignment({
          name: "",
          description: "",
          courseName: subCourseCode,
          deadlineDate: "",
          courseFullName: subCourseFullHeading,
          file: "",
        });
        dispatchStore(
          modifyAssignments([...fetchCourses.assignment, Assignment])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayModel = (element: Assignment) => {
    setIsModalOpen(true);
    setDisplayOnModal(element!);
  };

  return (
    <>
      <div>
        {userDataStore.role !== "Student" ? (
          <form onSubmit={handleAssignmentSubmit}>
            <table className="assignment-table">
              <tbody>
                <tr>
                  <th>Assignment Name</th>
                  <td>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="Enter assignment name"
                      onPaste={() => handleInputChange}
                      value={assignmentName}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <textarea
                      name="description"
                      required
                      placeholder="Enter assignment description"
                      value={assignmentDescription}
                      onPaste={() => handleInputChange}
                      onChange={handleInputChange}
                      style={{ height: "50px" }} // set the height to 200 pixels
                    />
                  </td>
                </tr>
                <tr>
                  <th>Deadline Date</th>
                  <td>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      name="deadlineDate"
                      required
                      placeholder="Enter deadline date"
                      value={deadlineDate}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>File upload</th>
                  <td>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      onChange={handleFileSubmission}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="submit-btn-container">
                    <button className="submit-btn" type="submit">
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-5">
        <h2 className="mt-4 text-center">Assignments</h2>
        {fetchCourses.assignment.filter((e) => e.courseName === subCourseCode)
          .length ? (
          <div className="ms-5 col-10">
            <Card className="ms-5">
              <ListGroup variant="flush">
                {fetchCourses.assignment
                  .filter((e) => e.courseName === subCourseCode)
                  .map((element, index) => (
                    <ListGroup.Item
                      className="my-1 d-flex justify-content-between"
                      key={index}
                    >
                      <p className="h5">{element.name}</p>
                      <Button
                        onClick={() => displayModel(element)}
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          <h5 className="text-center">No assignments has been posted yet!</h5>
        )}
      </div>
      <div>
        {isModalOpen ? (
          <Modal
            className="mt-5 ms-5"
            size="lg"
            show={isModalOpen}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header onClick={() => setIsModalOpen(false)} closeButton>
              <Modal.Title>{displayOnModal?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <p className="text-justify font-weight-light">
                  {displayOnModal?.description}
                </p>

                <a href={displayOnModal?.file} className="download-btn">
                  Download
                </a>
                <p>DeadLine : {displayOnModal?.deadlineDate}</p>
                <p>Date Posted : {displayOnModal?.datePosted}</p>
              </>
            </Modal.Body>
            <Modal.Footer>
              {userDataStore.role !== "Student" ? (
                <Button>Delete</Button>
              ) : (
                <></>
              )}
            </Modal.Footer>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
