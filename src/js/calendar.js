const ics = require("ics");
const { writeFileSync } = require("fs");
const momentHijri = require("moment-hijri");
const events = require("./calendar.json");

const years = ["1444", "1445", "1446"];
let myEventsList = [];

momentHijri.locale("en-US");

// for (let i = 0; i < years.length; i++) {
//   myEventsList = myEventsList.concat(
//     events.map((event) => {
//       let startDate = momentHijri(`${years[i]}/${event.date}`, "iYYYY/iM/iD");
//       if (!startDate.isValid()) {
//         startDate = momentHijri(
//           `${years[i]}/${event.fallbackDate}`,
//           "iYYYY/iM/iD"
//         );
//       }
//       let endDate = startDate.clone().add(1, "d");
//       return {
//         start: [startDate.year(), startDate.month() + 1, startDate.date()],
//         end: [endDate.year(), endDate.month() + 1, endDate.date()],
//         description: startDate.format("iDo iMMMM iYYYY"),
//         title: event.title,
//       };
//     })
//   );
// }

const nikkah = {
  start: [2024, 9, 22, 14, 0],
  duration: { hours: 4, minutes: 0 },
  title: "Saahil and Fatimah's Wedding",
  location:
    "Chandni Convention Centre, 5 Gateway Blvd, Brampton, ON L6T 4X2, Canada",
  url: "https://www.nups.us/",
  geo: { lat: 43.73708388795117, lon: -79.70080659999999 },
  categories: ["Wedding"],
  status: "CONFIRMED",
  busyStatus: "BUSY",
  organizer: { name: "Saahil and Fatimah", email: "admin@nups.us" },
  // attendees: [
  //   {
  //     name: "Saahil Jaffer",
  //     email: "contact@saahiljaffer.com",
  //     partstat: "ACCEPTED",
  //   },
  //   {
  //     name: "Fatimah Jessa",
  //     email: "fz.jessa@gmail.com",
  //     partstat: "ACCEPTED",
  //   },
  // ],
};

const mandwo = {
  start: [2024, 9, 18, 18, 0],
  duration: { hours: 2, minutes: 0 },
  title: "Fatimah's Mandwo",
  location:
    "Chandni Convention Centre, 5 Gateway Blvd, Brampton, ON L6T 4X2, Canada",
  url: "https://www.nups.us/",
  geo: { lat: 43.73708388795117, lon: -79.70080659999999 },
  categories: ["Wedding"],
  status: "CONFIRMED",
  busyStatus: "BUSY",
  organizer: { name: "Saahil and Fatimah", email: "admin@nups.us" },
  // attendees: [
  //   {
  //     name: "Saahil Jaffer",
  //     email: "contact@saahiljaffer.com",
  //     partstat: "ACCEPTED",
  //   },
  //   {
  //     name: "Fatimah Jessa",
  //     email: "fz.jessa@gmail.com",
  //     partstat: "ACCEPTED",
  //   },
  // ],
};

ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }

  writeFileSync(`${__dirname}/../../public/calendar.ics`, value);
});
