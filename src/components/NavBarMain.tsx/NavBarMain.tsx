import React from "react";
import "./NavBarMain.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/logo.jpeg";

const NavBarMain = () => {
  return (
    <>
      <div className="navBarContainer">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <span className="navBarContainer__brand">BrainWave</span>
            </Navbar.Brand>
            {["Courses", "Partners", "Community", "Contact Us"].map(
              (pageLink, index) => (
                <Nav.Link
                  key={index}
                  className="acitveNavbarLink"
                  //onClick={() => activeLinkSet(pageLink)}
                >
                  <span className="text-white p-2 navbarlink">
                    {pageLink.slice(0, 1).toUpperCase() + pageLink.slice(1)}
                  </span>
                </Nav.Link>
              )
            )}
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link className="text-white m-1">
                <span className="navBarContainer__NavButton">Log In</span>
              </Nav.Link>
              <Nav.Link className="text-white m-1">
                <span className="navBarContainer__NavButton">Register</span>
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavBarMain;
