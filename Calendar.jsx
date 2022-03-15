import React from "react";
import { Calendar, momentLocalizer } from "@saahiljaffer/react-big-calendar";
import moment from "moment";
import events from "./events.json";
import momentHijri from "moment-hijri";

const localizer = momentLocalizer(moment);

const years = ["1442", "1443", "1444", "1445", "1446"];
let myEventsList = [];

for (let i = 0; i < years.length; i++) {
  myEventsList = myEventsList.concat(
    events.map((event, index) => ({
      id: index,
      title: event.title,
      desc: event.desc,
      allDay: true,
      start: momentHijri(years[i] + "/" + event.date, "iYYYY/iM/iD").toDate(),
      end: momentHijri(years[i] + "/" + event.date, "iYYYY/iM/iD").toDate(),
    }))
  );
}

const CausesArea = () => {
  return (
    <div>
      <Calendar
        events={myEventsList}
        views={{
          month: true,
        }}
        localizer={localizer}
        culture="en"
        rtl={false}
        style={{ height: 650 }}
      />
    </div>
  );
};

export default CausesArea;
