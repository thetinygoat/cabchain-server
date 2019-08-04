const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const autoCompleteBaseURL =
	"https://maps.googleapis.com/maps/api/place/autocomplete";
const responseType = "json";
const region = "IN";
const getHelper = async query => {
	const response = await unirest.get(query);
	return new Promise((resolve, reject) => {
		if (response.statusCode === 200) {
			resolve(response.body);
			return;
		}
		const errorObj = {
			status: 500,
			title: "internal server error",
			detail: "internal server error"
		};
		reject(errorObj);
	});
};

const autoComplete = async query => {
	const requestURL = `http://dev.virtualearth.net/REST/v1/Locations/${query}?&key=AhISow8lG2QRH-7C6ba8HnxSUw6Y9paM2iJVU4Oiqx8NbUQ2v-Za0Jc5b2KNiP_g`;
	return getHelper(requestURL);
};

const autoCompleteLocation = async (req, res) => {
	const q = req.query.q;
	const response = await autoComplete(q);
	const predictions = response.resourceSets[0].resources.map(prediction => {
		return {...prediction.address, coordinates: prediction.point.coordinates};
	});
	res.json(predictions);
};

router.get("/", autoCompleteLocation);
module.exports = router;
