const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const userRoutes = require("./user/routes");
const locationRoutes = require("./location/routes");
const driverRoutes = require('./driver/routes')
app.use("/api/users", userRoutes);
app.use('/api/drivers', driverRoutes)
app.use("/api/location", locationRoutes);
module.exports = app;
