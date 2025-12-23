const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reservationId: { type: String, unique: true },
    partnerId: String,
    seats: Number,
    status: { type: String, default: "confirmed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
