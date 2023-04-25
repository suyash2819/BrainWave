import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteCourseAnnouncements,
  storeCourseAnnoncements,
} from "../../services/courseService";
import { Announcement } from "../../reducers/IAnnouncementProps";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { modifyAnnouncements } from "../../reducers/getCourses";
import "./Announcements.scss";
import { Card, Form } from "react-bootstrap";

interface annoucementCourseFlag {
  isCourseView: [boolean, string, string];
}

const Announcements = ({ isCourseView }: annoucementCourseFlag) => {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const [searchFilteredAnnoucement, setSearchFilteredAnnoucement] = useState<
    Announcement[]
  >(fetchCourses.allAnnouncements);
  const dispatchStore = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const [announcement, setAnnouncement] = useState<Announcement>({
    announcement_heading: "",
    announcement_name: "",
    announcement_subject: isCourseView[0] ? isCourseView[2] : "",
    announcement_description: "",
    annoucement_date: "",
  });

  useEffect(() => {
    setSearchFilteredAnnoucement(
      fetchCourses.allAnnouncements.filter(
        (e) => e.announcement_heading.indexOf(searchValue) !== -1
      )
    );
  }, [searchValue]);

  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Announcement>>({});

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    console.log(announcement);
    setAnnouncement({
      ...announcement,
      [name]: value,
      announcement_subject: isCourseView[0] ? isCourseView[2] : value,
    });
    console.log(announcement);
    setFormErrors({});
  };
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const deleteAnnouncements = (
    index: number,
    announcement_subject: string,
    ann: Announcement
  ) => {
    const delAnnouncement = fetchCourses.allAnnouncements.filter(
      (ann) => ann !== fetchCourses.allAnnouncements[index]
    );
    dispatchStore(modifyAnnouncements(delAnnouncement));
    deleteCourseAnnouncements(announcement_subject, ann);
  };

  const validatForm = () => {
    const errors: Partial<Announcement> = {};
    if (!announcement.announcement_heading.trim()) {
      errors.announcement_heading = "Title is required";
    }
    if (!announcement.announcement_name.trim()) {
      errors.announcement_name = "Name is required";
    }
    if (!announcement.announcement_subject.trim() && !isCourseView[0]) {
      errors.announcement_subject = "Subject is required";
    }
    if (!announcement.announcement_description.trim()) {
      errors.announcement_description = "Description is required";
    }
    if (!announcement.annoucement_date.trim()) {
      errors.annoucement_date = "Date is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(announcement);
    if (validatForm()) {
      storeCourseAnnoncements(announcement).then((result) => {
        if (result) {
          setShowAlert({
            success: true,
            message: "Announcement Posted Successfully!",
            show: true,
            type: "",
          });
          dispatchStore(
            modifyAnnouncements([
              ...fetchCourses.allAnnouncements,
              announcement,
            ])
          );

          setFormErrors({});
          setAnnouncement({
            announcement_heading: "",
            announcement_name: "",
            announcement_subject: isCourseView[0] ? isCourseView[2] : "",
            announcement_description: "",
            annoucement_date: "",
          });
        } else {
          setShowAlert({
            success: false,
            message: "Some error has occured while posting",
            show: true,
            type: "",
          });
        }
      });
    }
  };
  return (
    <div className="mx-5 p-3">
      <div className="approvePageAlert">
        {showAlert.show ? (
          <AlertMessage
            success={showAlert.success}
            message={showAlert.message}
            alertDisplay={alertMessageDisplay}
            type=""
          />
        ) : null}
      </div>
      {userDetails.role === "Administrator" ||
      userDetails.role === "Faculty" ? (
        <div className="teacherAnnouncements_Container d-flex flex-row">
          <div className="teacherAnnouncements_form col-11 card m-3 row">
            <Card
              className={
                dashboardVals.darkMode === "dark"
                  ? "bg-dark text-white p-3"
                  : "p-3"
              }
            >
              <div className="card-header ">
                <h5>Create Announcements</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="d-flex mb-3 flex-row justify-content-around">
                    <div className="mx-3 col-4">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="announcement_name"
                        name="announcement_name"
                        placeholder="Name"
                        value={announcement.announcement_name}
                        onChange={handleInputChange}
                      ></input>
                      {formErrors.announcement_name && (
                        <div className="annoucementValidation">
                          {formErrors.announcement_name}
                        </div>
                      )}
                    </div>
                    <div className="mx-3 col-4">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control "
                        id="announcement_heading"
                        name="announcement_heading"
                        placeholder="announcement heading"
                        value={announcement.announcement_heading}
                        onChange={handleInputChange}
                      ></input>
                      {formErrors.announcement_heading && (
                        <div className="annoucementValidation">
                          {formErrors.announcement_heading}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex mb-3 flex-row justify-content-around">
                    <div className="mx-3 col-4">
                      <label>Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="annoucement_date"
                        min={new Date().toISOString().split("T")[0]}
                        name="annoucement_date"
                        value={announcement.annoucement_date}
                        onChange={handleInputChange}
                      />
                      {formErrors.annoucement_date && (
                        <div className="annoucementValidation">
                          {formErrors.annoucement_date}
                        </div>
                      )}
                    </div>
                    <div className="mx-3 col-4">
                      <label>Subject</label>
                      {!isCourseView[0] ? (
                        <select
                          id="announcement_subject"
                          name="announcement_subject"
                          className="form-control custom-select"
                          value={announcement.announcement_subject}
                          onChange={handleInputChange}
                        >
                          <option>Choose...</option>
                          {fetchCourses.courseDetails.map((e, index) => (
                            <option
                              value={fetchCourses.coursesAbbrv[index]}
                              key={index}
                            >
                              {e}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="mt-2">{isCourseView[1]}</p>
                      )}
                      {formErrors.announcement_subject && (
                        <div className="annoucementValidation">
                          {formErrors.announcement_subject}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex mb-3 flex-row justify-content-around">
                    <div className="mx-3 col-10">
                      <label>Description</label>
                      <textarea
                        id="announcement_description"
                        name="announcement_description"
                        value={announcement.announcement_description}
                        onChange={handleInputChange}
                        className="form-control"
                        aria-label="Type the description of the announcement here"
                      ></textarea>
                      {formErrors.announcement_description && (
                        <div className="annoucementValidation">
                          {formErrors.announcement_description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-around">
                    <button type="submit" className="btn col-5 btn-primary">
                      Post Annoncement
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Card
        className={
          dashboardVals.darkMode === "dark"
            ? "bg-dark text-white p-3 announcements_table m-3 col-11"
            : "p-3 announcements_table m-3 col-11"
        }
      >
        <div className="card-header">
          <h5>Announcements</h5>
        </div>
        <Form.Control
          type="search"
          placeholder="Search by title..."
          className=" mt-2"
          aria-label="Search"
          style={{
            backgroundColor: dashboardVals.darkMode === "dark" ? "#212529" : "",
            borderColor: dashboardVals.darkMode === "dark" ? "white" : "white",
            color: dashboardVals.darkMode === "dark" ? "white" : "",
            borderWidth: "2px",
            boxShadow:
              dashboardVals.darkMode === "dark"
                ? "1 2 2px white"
                : "0 0 2px black",
            fontSize: "15px",
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div className="card-body">
          {fetchCourses.allAnnouncements.length ? (
            <table
              className={
                dashboardVals.darkMode === "dark"
                  ? "table text-white table-bordered"
                  : "table table-bordered"
              }
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col"> Subject</th>
                  <th scope="col">Description</th>
                  {userDetails.role === "Administrator" ||
                  userDetails.role === "Faculty" ? (
                    <th scope="col">Delete</th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {!searchValue.length &&
                  fetchCourses.allAnnouncements.map(
                    (ann: Announcement, index) =>
                      (!isCourseView[0] ||
                        ann.announcement_subject === isCourseView[2]) && (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>

                          <>
                            <td>{ann.announcement_name}</td>
                            <td>{ann.announcement_heading}</td>
                            <td>
                              {
                                fetchCourses.courseDetails[
                                  fetchCourses.coursesAbbrv.indexOf(
                                    ann.announcement_subject
                                  )
                                ]
                              }
                            </td>
                            <td>
                              {ann.announcement_description.length > 40
                                ? ann.announcement_description.substring(
                                    0,
                                    30
                                  ) + "..."
                                : ann.announcement_description}
                            </td>
                          </>
                          {userDetails.role === "Administrator" ||
                          userDetails.role === "Faculty" ? (
                            <td>
                              <button
                                className="btn btn-danger form-control"
                                onClick={() => {
                                  deleteAnnouncements(
                                    index,
                                    ann.announcement_subject,
                                    ann
                                  );
                                }}
                              >
                                <FontAwesomeIcon
                                  className="m-1 fa-s"
                                  icon={faTrash}
                                />
                              </button>
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      )
                  )}
                {searchValue.length ? (
                  searchFilteredAnnoucement.map(
                    (ann: Announcement, index) =>
                      (!isCourseView[0] ||
                        ann.announcement_subject === isCourseView[2]) && (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>

                          <>
                            <td>{ann.announcement_name}</td>
                            <td>{ann.announcement_heading}</td>
                            <td>
                              {
                                fetchCourses.courseDetails[
                                  fetchCourses.coursesAbbrv.indexOf(
                                    ann.announcement_subject
                                  )
                                ]
                              }
                            </td>
                            <td>
                              {ann.announcement_description.length > 40
                                ? ann.announcement_description.substring(
                                    0,
                                    30
                                  ) + "..."
                                : ann.announcement_description}
                            </td>
                          </>
                          {userDetails.role === "Administrator" ||
                          userDetails.role === "Faculty" ? (
                            <td>
                              <button
                                className="btn btn-danger form-control"
                                onClick={() => {
                                  deleteAnnouncements(
                                    index,
                                    ann.announcement_subject,
                                    ann
                                  );
                                }}
                              >
                                <FontAwesomeIcon
                                  className="m-1 fa-s"
                                  icon={faTrash}
                                />
                              </button>
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      )
                  )
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          ) : (
            <h3>No Annoucements!</h3>
          )}
          {searchFilteredAnnoucement.length === 0 ? (
            <h4 className="text-center">
              {" "}
              No annoucements found with this title!
            </h4>
          ) : (
            <></>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Announcements;
