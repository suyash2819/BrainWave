import React from "react";
import "./AboutUs.scss";
import NavBarMain from "../../components/NavBarMain.tsx/NavBarMain";
import aboutus_first from "../../assets/about_us/team.jpg";
import aboutus_second from "../../assets/about_us/mission.jpg";
import aboutus_third from "../../assets/about_us/features.jpg";
import aboutus_fourth from "../../assets/about_us/contact.jpg";

const AboutUs = () => {
  return (
    <div>
      <NavBarMain />
      <div className="aboutus_Container">
        <div className="row mx-5 my-3">
          <div className="card aboutus_card col-md-11  ms-5 text-center">
            <div className="card-header">
              <h2>About us</h2>
            </div>
            <div className="card-body">
              <h5 className="card-title">Welcome to BrainWave!</h5>
              <p className="card-text">
                Our platform is designed to provide an accessible and engaging
                learning experience for students and educators alike.
              </p>
            </div>
          </div>
        </div>
        <div className="card-group my-3">
          <div className="card mx-3">
            <img
              src={aboutus_first}
              alt="mainPagepPic"
              className="card-img-top aboutus_img_top"
            />
            <div className="card-body">
              <h5 className="card-title">Our Team</h5>
              <hr></hr>
              <p className="card-text">
                Our team is comprised of experienced educators, developers, and
                designers who are passionate about making education more
                accessible and engaging. We are constantly seeking new ways to
                improve our platform and meet the evolving needs of our users.
              </p>
            </div>
          </div>
          <div className="card mx-3">
            <img
              src={aboutus_second}
              alt="mainPagepPic"
              className="card-img-top aboutus_img_top"
            />
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <hr></hr>
              <p className="card-text">
                Our mission is to empower learners of all ages and backgrounds
                to achieve their educational goals through innovative technology
                and dedicated support. We believe that education should be
                accessible to everyone, and our platform reflects that
                commitment.
              </p>
            </div>
          </div>
          <div className="card mx-3">
            <img
              src={aboutus_third}
              alt="mainPagepPic"
              className="card-img-top aboutus_img_top"
            />
            <div className="card-body">
              <h5 className="card-title">Our Features</h5>
              <hr></hr>
              <p className="card-text">
                BrainWave offers a range of features that make it easy for
                students and educators to collaborate and achieve their
                educational goals.These features include: User-friendly
                interface, Course creation tools, Discussion forums, Progress
                tracking.
              </p>
            </div>
          </div>
          <div className="card mx-3">
            <img
              src={aboutus_fourth}
              alt="mainPagepPic"
              className="card-img-top aboutus_img_top"
            />
            <div className="card-body">
              <h5 className="card-title">Contact Us!</h5>
              <hr></hr>
              <p className="card-text">
                We value your feedback and are always looking for ways to
                improve our platform. If you have any questions or comments,
                please don't hesitate to contact us by clicking the below button
              </p>
              <p className="card-text">
                <button className="btn btn-primary">Contact Us!</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
