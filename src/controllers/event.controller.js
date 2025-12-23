const Event = require("../models/event.model");
// const Reservation = require("../models/reservation.model");

exports.getEventSummary = async (req, res) => {
  const event = await Event.findOne({ eventId: "node-meetup-2025" });
  const count = event.totalSeats - event.availableSeats;

  res.json({
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount: count,
    version: event.version
  });
};
