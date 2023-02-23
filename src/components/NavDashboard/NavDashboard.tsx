import React from "react";
import "./NavDashboard.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import defaultpfp from "../../assets/defaultPfp.jpg";
import Image from "react-bootstrap/Image";
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

              <Dropdown className=" m-1">
                <Dropdown.Toggle
                  as={Nav.Link}
                  className="navdashContainer__profile"
                >
                  <Image
                    alt=""
                    src={defaultpfp}
                    roundedCircle
                    height={25}
                    width={25}
                    className="mr-2"
                    style={{ marginRight: "3px" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-left">
                  <Dropdown.Item>Account</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavDashboard;
