import React, { useState } from "react";
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

const Announcements = () => {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const dispatchStore = useAppDispatch();

  const [announcement, setAnnouncement] = useState<Announcement>({
    announcement_heading: "",
    announcement_name: "",
    announcement_subject: "",
    announcement_description: "",
    annoucement_date: "",
  });

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
    setAnnouncement({ ...announcement, [name]: value });
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
    if (!announcement.announcement_subject.trim()) {
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

          setAnnouncement({
            announcement_heading: "",
            announcement_name: "",
            announcement_subject: "",
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
      <div className="teacherAnnouncements_Container d-flex flex-row">
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
        <div className="teacherAnnouncements_form col-11 card m-3 row">
          <div className="card-header ">
            <h5>Create Announcements</h5>
          </div>
          <div className="card-body">
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
                    <select
                      id="announcement_subject"
                      name="announcement_subject"
                      className="form-control custom-select"
                      value={announcement.announcement_subject}
                      onChange={handleInputChange}
                    >
                      <option selected>Choose...</option>
                      {fetchCourses.courseDetails.map((e, index) => (
                        <option
                          value={fetchCourses.coursesAbbrv[index]}
                          key={index}
                        >
                          {e}
                        </option>
                      ))}
                    </select>
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
          </div>
        </div>
      </div>
      <div className="announcements_table  m-3 card col-11">
        <div className="card-header">
          <h5>Announcements</h5>
        </div>
        <div className="card-body">
          {fetchCourses.allAnnouncements.length ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col"> Subject</th>
                  <th scope="col">Description</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {fetchCourses.allAnnouncements.map(
                  (ann: Announcement, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>

                      <>
                        <td>{ann.announcement_name}</td>
                        <td>{ann.announcement_heading}</td>
                        <td>{fetchCourses.courseDetails[index]}</td>
                        <td>{ann.announcement_description}</td>
                      </>

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
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <h3>No Annoucements!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
