import React, { useState, useEffect } from "react";
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

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const dispatchNavbarVals = useAppDispatch();

  const options:Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York", // set the time zone to EST
    hour12: true, // use 12-hour format
    hour: "2-digit", // display hours with leading zeros
    minute: "2-digit", // display minutes with leading zeros
    second: "2-digit",
    timeZoneName: "short" // display time zone name
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(time);
  

  
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

            
            <Nav.Link><p className="navdashContainer__clock">
                {formattedDate}
              </p></Nav.Link>
            

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
