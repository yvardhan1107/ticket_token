const express = require("express");
const app = express();

app.use(express.json());

app.use("/reservations", require("./routes/reservation.routes"));
app.use("/event", require("./routes/event.routes"));

module.exports = app;
