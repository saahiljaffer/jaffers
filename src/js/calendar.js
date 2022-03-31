const ics = require("ics");
const { writeFileSync } = require("fs");
const momentHijri = require("moment-hijri");
const events = require("./calendar.json");

const years = ["1443", "1444"];
let myEventsList = [];

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
        start: [startDate.year(), startDate.month() + 1, startDate.date()],
        end: [endDate.year(), endDate.month() + 1, endDate.date()],
        description: startDate.format("iDo iMMMM"),
        title: event.title,
        color: event.color,
      };
    })
  );
}

ics.createEvents(myEventsList, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }

  writeFileSync(`${__dirname}/../../public/cal.ics`, value);
});
