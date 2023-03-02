import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import "./Calendar.scss"
export default function Calendar() {
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




// import { Eventcalendar} from '@mobiscroll/react'; /* or import any other component */
// import '@mobiscroll/react/dist/css/mobiscroll.scss';
// import React from "react";


// import "@mobiscroll/react/dist/css/mobiscroll.modular.scss"

// setOptions({
//     eventcalendar: {
//       theme: 'ios-dark',
//       display: 'inline',
//       layout: 'liquid',
//       view: {
//         calendar: { labels: true },
//         eventList: { labels: true }
//       },
//       background: $mbsc-calendar-background-light ? '#f6f6f6' : '#ffffff' // Use the variable here
//     }
//   });


// export default function Calendar() {
//     return (
//       <>
//         <div >
//           <div className="demo-app-main" style={{  height: '90vh' }}>
//             <Eventcalendar
              
//               data={[
//                 {
//                   start: new Date(),
//                   title: "Today's event",
//                 },
//                 {
//                   start: new Date(2020, 11, 18, 9, 0),
//                   end: new Date(2020, 11, 20, 13, 0),
//                   title: "Multi day event",
//                 },
//               ]}
//             />
//           </div>
//         </div>
      
//     </>
// );
// }
  