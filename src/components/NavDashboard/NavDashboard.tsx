import React from "react";
import "./NavDashboard.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import defaultpfp from "../../assets/defaultPfp.jpg";
import Image from "react-bootstrap/Image";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { componentToggle, modifyHeading } from "../../reducers/dasboardVals";
const NavDashboard = () => {
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const dispatchNavbarVals = useAppDispatch();
  return (
    <>
      <div className="navdashContainer">
        <Navbar style={{ height: "70px" }}>
          <Container>
            <Nav.Link>
              <p className="navdashContainer__headerTitle">
                {dashboardVals.heading}
              </p>
            </Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link
                onClick={() => {
                  dispatchNavbarVals(componentToggle("calendar"));
                  dispatchNavbarVals(modifyHeading("Calendar"));
                }}
                className="m-1"
              >
                <FontAwesomeIcon className="m-2 fa-xl" icon={faCalendarWeek} />
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  dispatchNavbarVals(componentToggle("announcements"));
                  dispatchNavbarVals(modifyHeading("Announcements"));
                }}
                className="m-1"
              >
                <FontAwesomeIcon className="m-2 fa-xl" icon={faBullhorn} />
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
                  <Dropdown.Item>{userDetails.username}</Dropdown.Item>
                  <hr />
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
