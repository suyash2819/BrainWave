import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import React from "react";
import "./Calendar.scss";
export default function Calendar() {
  const events = [
    {
      title: "event 1",
      date: "2023-04-01",
      description: "this is event info",
    },
    {
      title: "event 2",
      date: "2023-04-02",
      description: "this is event info",
    },
  ];

  return (
    <>
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
            eventColor="red"
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

const handleEventClick = (info: EventClickArg) => {
  alert(info.event.extendedProps["description"]);
};
