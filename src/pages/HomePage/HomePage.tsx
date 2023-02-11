import React from "react";
import "./HomePage.scss";
import homePageImg from "../../assets/homePageImg.jpg";
import first from "../../assets/course/1.jpg";
import second from "../../assets/course/2.jpg";
import third from "../../assets/course/3.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const HomePage = () => {
  const cardData = [
    {
      image: first,
      data: "Reinvesting the way to study",
      coach: "John White",
    },
    {
      image: second,
      data: "Arts and Culture are te way of study",
      coach: "David Truman",
    },
    {
      image: third,
      data: "Science and Technology of tomorrow",
      coach: "Simon Lanback",
    },
  ];

  return (
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
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>{element.data}</Card.Text>
                  <Button variant="primary">Select Course</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <hr />
      </div>
      <div className="homePageContainer__experience">
        <h1 className="homePageContainer__experience__title">THE EXPERIENCE</h1>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
