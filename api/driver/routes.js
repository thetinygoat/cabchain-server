const express = require("express");
const { auth, database } = require("../firebase");
const router = express.Router();
const uuid = require("uuid/v4");
const addDriver = async (req, res) => {
  let { address, base_fare } = req.body;
  try {
    const id = uuid();
    const newdriver = await database.ref(`drivers/${id}`).set({
      address,
      base_fare,
      id
    });
    return res.status(201).json({ address, base_fare, id });
  } catch (e) {
    console.log(e);
    res.status(409).json(e);
  }
};
const getDriver = async (req, res) => {
  let { id } = req.query;
  try {
    database
      .ref(`drivers/`)
      .once("value")
      .then(resp => {
        return res.status(201).json(resp);
      });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};
router.post("/new", addDriver);
router.get("/", getDriver);

module.exports = router;
