/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const moment = require("moment");
// eslint-disable-next-line no-unused-vars
const momentTimezone = require("moment-timezone");
const momentHijri = require("moment-hijri");
// eslint-disable-next-line no-unused-vars
const momentHijriTimezone = require("hijri-moment-timezone");
const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
initializeApp();

exports.times = onRequest(
  { cors: ["localhost", "jaffers.ca"] },
  async (request, response) => {
    const db = getFirestore();
    const today = moment().locale("en").tz("America/Toronto");
    const doc = await db.collection("times").doc(today.format("MM-DD")).get();
    const prayers = doc.data();
    Object.keys(prayers).forEach((name) => {
      prayers[name] = moment(prayers[name], "h:mm")
        .locale("en")
        .add(today.isDST(), "hours")
        .format("h:mm");
    });
    const islamicDate = momentHijri().locale("en").tz("America/Toronto");
    response.json({
      prayers,
      day: islamicDate.format("iDo"),
      month: islamicDate.format("iMMMM"),
      year: islamicDate.format("iYYYY"),
    });
  }
);
