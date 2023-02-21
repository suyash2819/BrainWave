import React, { useState } from "react";
import "./HomePage.scss";
import homePageImg from "../../assets/homePageImg.jpg";
import first from "../../assets/course/1.jpg";
import second from "../../assets/course/2.jpg";
import third from "../../assets/course/3.jpg";
import firstExp from "../../assets/experience/first.jpg";
import secondExp from "../../assets/experience/second.png";
import thirdExp from "../../assets/experience/third.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FooterMain from "../../components/Footer/FooterMain";
import NavBarMain from "../../components/NavBarMain.tsx/NavBarMain";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { storeContactUsInfo } from "../../services/userService";

const HomePage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [emailVal, setEmailVal] = useState<string>("");
  const [innerTextVal, setInnerTextVal] = useState<string>("");
  const [showError, setShowError] = useState<[boolean, string]>([false, ""]);
  const navigate = useNavigate();
  const cardData = [
    {
      image: first,
      title: "Management",
      data: "Reinvesting the way to study",
      coach: "John White",
    },
    {
      image: second,
      title: "Literature",
      data: "Arts and Culture are te way of study",
      coach: "David Truman",
    },
    {
      image: third,
      title: "Life & Mental Health",
      data: "Science and Technology of tomorrow",
      coach: "Simon Lanback",
    },
  ];
  const experienceData = [
    {
      image: firstExp,
      title: "Enroll",
      data: "Become a student of the kadenze.com community and enjoy access to the courses in our catalog, and much more.",
      buttonText: "Register Here",
    },
    {
      image: secondExp,
      title: "A Global Classroom",
      data: "Collaborate with your peers, showcase your work, and learn on your own schedule with our easy-to-use interactive virtual learning environment.",
      buttonText: "More Features",
    },
    {
      image: thirdExp,
      title: "College Credit",
      data: "Take your education to the next level by receiving college credit on select courses offered by our network of distinguished institutional partners.",
      buttonText: "Explore Options",
    },
  ];
  const handleRegdirect = () => {
    navigate("/Registration");
  };
  const handleClose = () => {
    storeContactUsInfo(emailVal, innerTextVal);
    setEmailVal("");
    setInnerTextVal("");
    setShowError([false, "text"]);
    setShow(false);
  };
  const onEmailChange = (email: string) => {
    setShowError([false, "email"]);
    setEmailVal(email);
  };
  const onInnerTextChange = (InnerText: string) => {
    setShowError([false, "text"]);
    setInnerTextVal(InnerText);
  };
  const handleSubmit = () => {
    if (!emailVal.length && !innerTextVal.length) {
      setShowError([true, "empty"]);
      return;
    } else {
      if (emailVal.length) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)) {
        } else {
          setShowError([true, "email"]);
          return;
        }
      }
      if (innerTextVal.length < 2) {
        setShowError([true, "text"]);
        return;
      }
      handleClose();
    }
  };
  return (
    <>
      <NavBarMain />
      <div className="homePageContainer">
        <div className="homePageContainer__content">
          <div className="homePageContainer__content__textLine">
            <span className="homePageContainer__content__textLine__header">
              DISCOVER YOUR CURATIVE EDUCATION
            </span>
            <div>
              <span className="homePageContainer__content__textLine__subText">
                Join edapp.com Revolutionizing the way we learn, one lesson at a
                time. Join us on the cutting-edge of education technology.
              </span>
            </div>
            <Button
              variant="secondary mt-5"
              className="homePageContainer__content__textLine__startButton"
              size="lg"
              onClick={handleRegdirect}
            >
              Get Started Today
            </Button>
          </div>
          <img
            src={homePageImg}
            alt="mainPagepPic"
            className="homePageContainer__content__mainPagepPic"
          />
        </div>
        <div className="homePageContainer__courses">
          <span className="homePageContainer__courses__headText">
            Discover courses that stimulate your imagination
          </span>
          <div className="homePageContainer__courses__headContainer">
            {[
              "ALL",
              "VISUAL",
              "ARTS",
              "CREATIVE COMPUTING",
              " MUSIC TECHNOLOGY",
              "DESIGN & FASHION",
              "FILM & VIDEOGRAPHY",
            ].map((pageLink: string, index: number) => (
              <a
                href="/#"
                key={index}
                style={{
                  borderRight: index !== 6 ? "solid 1px black" : "",
                }}
                className="homePageContainer__courses__headContainer__headlinks"
              >
                {pageLink}
              </a>
            ))}
          </div>
          <div className="homePageContainer__courses__cardsContainer">
            {cardData.map((element, index) => {
              return (
                <Card
                  className="homePageContainer__courses__cardsContainer__card"
                  key={index}
                >
                  <Card.Img variant="top" src={element.image} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.data}</Card.Text>
                    <Button variant="primary">Select Course</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <hr style={{ marginInline: "100px" }} />
        </div>
        <div className="homePageContainer__experience">
          <h1 className="homePageContainer__experience__title">
            THE EXPERIENCE
          </h1>
          <div className="homePageContainer__experience__postContainer">
            {experienceData.map((element, index: number) => {
              return (
                <div
                  className="homePageContainer__experience__postContainer__postCard"
                  key={index}
                >
                  <img
                    className="homePageContainer__experience__postContainer__postCard__image"
                    src={element.image}
                    alt={"postCard"}
                  />
                  <p className="homePageContainer__experience__postContainer__postCard__title">
                    {element.title}
                  </p>
                  <p className="homePageContainer__experience__postContainer__postCard__content">
                    {element.data}
                  </p>
                  <button className="homePageContainer__experience__postContainer__postCard__button">
                    {element.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
          <hr style={{ marginInline: "300px" }} />
          <p className="homePageContainer__experience__titleBottom">
            FROM THE COMMUNITY
          </p>
          <p className="homePageContainer__experience__subTextBottom">
            A community of learners growing together for over 7 years
          </p>
        </div>
      </div>
      <FooterMain setState={setShow} />
      {show ? (
        <Modal backdrop="static" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Hit us Up!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Stuff that you want to say</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  rows={3}
                  placeholder="Something...(Also please include your name :D)"
                  onChange={(e) => {
                    onInnerTextChange(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
            {showError[1] === "email" && showError[0] ? (
              <span>That doesn't seem like an email address...</span>
            ) : showError[1] === "text" && showError[0] ? (
              <span>Message is way less than I expected :'(</span>
            ) : showError[1] === "empty" && showError[0] ? (
              <span>Empty? that's just spam ;)</span>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSubmit()}>
              Send!
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomePage;
