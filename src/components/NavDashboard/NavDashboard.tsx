import React from "react";
import "./NavDashboard.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavDashboard = () => {
  return (
    <>
      <div className="navdashContainer">
        <Navbar style={{ height: "70px" }} bg="dark" variant="dark">
          <Container>
            {["Forum", "Courses", "Student", "Instructor"].map(
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
                <span className="navdashContainer__notification">notify</span>
              </Nav.Link>
              <Nav.Link className="text-white m-1">
                <span className="navdashContainer__profile">profile</span>
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavDashboard;
