import React from "react";
import "./NavDashboard.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
const NavDashboard = () => {
  return (
    <>
      <div className="navdashContainer">
        <Navbar style={{ height: "70px" }}>
          <Container>
            <Nav.Link>
              <p className="navdashContainer__headerTitle">Dashboard</p>
            </Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link className="m-1">
                <FontAwesomeIcon className="m-2 fa-xl" icon={faCalendarWeek} />
              </Nav.Link>
              <Nav.Link className="m-1">
                <FontAwesomeIcon className="m-2 fa-xl" icon={faBell} />
              </Nav.Link>

              <Nav.Link className=" m-1">
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
