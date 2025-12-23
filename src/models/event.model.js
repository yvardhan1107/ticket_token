const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, unique: true },
    name: String,
    totalSeats: Number,
    availableSeats: Number,
    version: { type: Number, default: 0 }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", eventSchema);
