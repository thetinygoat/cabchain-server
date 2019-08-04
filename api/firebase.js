const firebase = require("firebase");
firebase.initializeApp({
	apiKey: "AIzaSyBe3j5Vrynp2iq_bJF-gat3W5_rJBLEn4s",
	databaseURL: "https://cabchain-6d0a1.firebaseio.com/"
});
const database = firebase.database();
const auth = firebase.auth();
exports.database = database;
exports.auth = auth;
