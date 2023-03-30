import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import React from "react";
import "./Calendar.scss";
import { IAlertProps } from "../../components/AlertMessage/IAlertProps";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

interface courseDetailsArr {
  courseDetailsarr: courseDetails[];
}
type courseDetails = {
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  schedule: string;
  title: string;
};

type Event = {
  title: string;
  description: string;
  start: string;
  end: string;
  extendedProps: {
    startTime: string;
    endTime: string;
  };
  daysOfWeek: string[];
  eventColor: string;
};

export default function Calendar({ courseDetailsarr }: courseDetailsArr) {
  const events: Event[] = [];
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const [showAlert, setShowAlert] = useState<IAlertProps>({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  // eslint-disable-next-line no-lone-blocks
  {
    fetchCourses.coursesAbbrv &&
      userDataStore.role !== "Administrator" &&
      courseDetailsarr.forEach((element) => {
        const title = element.title;
        const description = element.description;
        const str = element.schedule;
        // split timings and days into separate variables
        const [timing, days] = str.split(". ");

        // split timing into start and end times
        const [startTime, endTime] = timing.split(" - ").map((time) => {
          // remove AM/PM from time string
          const formattedTime = time.replace(/(am|pm)/gi, "").trim();

          // pad single digit hour with 0
          const [hour, minute] = formattedTime.split(":").map((value) => {
            if (value.length === 1) {
              return "0" + value;
            }
            return value;
          });

          // return time in HH:mm:ss format
          return `${hour}:${minute}:00`;
        });

        const dayNames = days.split("-");
        const dayNumbers = dayNames
          .map((dayName) => {
            switch (dayName.trim().toLowerCase()) {
              case "mon":
                return "1";
              case "tu":
                return "2";
              case "wed":
                return "3";
              case "thur":
                return "4";
              case "fri":
                return "5";
              case "sat":
                return "6";
              case "sun":
                return "0";
              default:
                return "-1";
            }
          })
          .filter((dayNumber) => dayNumber !== "-1");

        const eventList = dayNumbers.map((dayOfWeek) => ({
          title: title,
          description: description,
          start: startTime,
          end: endTime,
          extendedProps: {
            startTime: startTime,
            endTime: endTime,
          },
          daysOfWeek: [dayOfWeek],
          eventColor: "blue",
        }));

        events.push(...eventList);
      });
  }
  const alertMessageDisplay = () => {
    setShowAlert({
      success: false,
      show: false,
      message: "",
      type: "",
    });
  };
  const handleEventClick = (info: EventClickArg) => {
    setShowAlert({
      success: true,
      message:
        "Class: " +
        info.event.title +
        ",This class starts at " +
        info.event.extendedProps["startTime"] +
        " and ends at " +
        info.event.extendedProps["endTime"],
      show: true,
      type: "",
    });
  };
  return (
    <>
      <div className="logPageAlert" style={{ zIndex: 1 }}>
        {showAlert.show ? (
          <AlertMessage
            success={showAlert.success}
            message={showAlert.message}
            alertDisplay={alertMessageDisplay}
            type={showAlert.type}
          />
        ) : null}
      </div>
      <div className="demo-app">
        <div className="calendar__container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events}
            eventColor="rgb(0, 26, 54)"
            eventClick={handleEventClick}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            //select={this.handleDateSelect}
            //eventContent={renderEventContent} // custom render function
            //eventClick={this.handleEventClick}
            //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    </>
  );
}
