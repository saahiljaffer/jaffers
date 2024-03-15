const functions = require("firebase-functions");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const momentHijri = require("moment-hijri");
const momentHijriTimezone = require("hijri-moment-timezone");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

exports.times = functions
  .region("us-east1")
  .https.onRequest(async (req, res) => {
    initializeApp();
    const db = getFirestore();
    const today = moment().locale("en").tz("America/Toronto");
    const doc = await db.collection("times").doc(today.format("MM-DD")).get();
    const data = doc.data();
    const modifiedPrayers = Object.keys(data).map((name) => {
      return {
        time: moment(data[name], "h:mm")
          .locale("en")
          .add(today.isDST(), "hours")
          .format("h:mm"),
        name,
      };
    });
    const islamicDate = momentHijri().locale("en").tz("America/Toronto");
    res.json({
      prayers: modifiedPrayers,
      day: islamicDate.format("iDo"),
      month: islamicDate.format("iMMMM"),
      year: islamicDate.format("iYYYY"),
    });
  });
