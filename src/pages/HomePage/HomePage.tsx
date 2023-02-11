import React from "react";
import "./HomePage.scss";
// @ts-ignore
import homePageImg from "../../assets/homePageImg.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const HomePage = () => {
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
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
