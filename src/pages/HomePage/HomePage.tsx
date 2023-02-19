import React from "react";
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

const HomePage = () => {
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

  return (
    <>
      {" "}
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
      <FooterMain />
    </>
  );
};

export default HomePage;
