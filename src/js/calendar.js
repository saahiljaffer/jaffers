const ics = require("ics");
const { writeFileSync } = require("fs");
const momentHijri = require("moment-hijri");
const events = require("./calendar.json");
const { start } = require("repl");

const years = ["1444", "1445", "1446"];
let myEventsList = [];

momentHijri.locale("en-US");

for (let i = 0; i < years.length; i++) {
  myEventsList = myEventsList.concat(
    events.map((event) => {
      let startDate = momentHijri(`${years[i]}/${event.date}`, "iYYYY/iM/iD");
      if (!startDate.isValid()) {
        startDate = momentHijri(
          `${years[i]}/${event.fallbackDate}`,
          "iYYYY/iM/iD"
        );
      }
      let endDate = startDate.clone().add(1, "d");
      return {
        uid: `id_${event.title
          .replace(/\W/g, "")
          .toLowerCase()}_${startDate.format("iYYYY")}`,
        start: [startDate.year(), startDate.month() + 1, startDate.date()],
        end: [endDate.year(), endDate.month() + 1, endDate.date()],
        description: startDate.format("iDo iMMMM iYYYY"),
        title: event.title,
        transp: event.busyStatus === "BUSY" ? "OPAQUE" : "TRANSPARENT",
      };
    })
  );
}

ics.createEvents(myEventsList, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }

  writeFileSync(`${__dirname}/../../public/calendar.ics`, value);
});
