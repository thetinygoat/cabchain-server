const express = require("express");
const { auth } = require("../firebase");
const router = express.Router();

const addUser = async (req, res) => {
	let { username, password } = req.body;
	username = `${username}@cabchain.eth`;
	try {
		const newuser = await auth.createUserWithEmailAndPassword(
			username,
			password
		);
		return res.status(201).json(newuser);
	} catch (e) {
		console.log(e);
		res.status(409).json(e);
	}
};
const loginUser = async (req, res) => {
	let { username, password } = req.body;
	username = `${username}@cabchain.eth`;
	try {
		const newuser = await auth.signInWithEmailAndPassword(username, password);
		return res.status(201).json(newuser);
	} catch (e) {
		console.log(e);
		res.status(404).json(e);
	}
};
router.post("/new", addUser);
router.post("/login", loginUser);

module.exports = router;
