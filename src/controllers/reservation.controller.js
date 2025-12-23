const Event = require("../models/event.model");
const Reservation = require("../models/reservation.model");
const { v4: uuidv4 } = require("uuid");

exports.reserveSeats = async (req, res) => {
  const { partnerId, seats } = req.body;

  if (seats <= 0 || seats > 10) {
    return res.status(400).json({ error: "Seats must be between 1 and 10" });
  }

  const event = await Event.findOne({ eventId: "node-meetup-2025" });

  if (event.availableSeats < seats) {
    return res.status(409).json({ error: "Not enough seats left" });
  }

  // Optimistic concurrency
  const updated = await Event.findOneAndUpdate(
    {
      _id: event._id,
      version: event.version,
      availableSeats: { $gte: seats }
    },
    {
      $inc: { version: 1 },
      $set: { availableSeats: event.availableSeats - seats }
    },
    { new: true }
  );

  if (!updated) {
    return res.status(409).json({ error: "Seat conflict, try again" });
  }

  const reservation = await Reservation.create({
    reservationId: uuidv4(),
    partnerId,
    seats
  });

  res.status(201).json({
    reservationId: reservation.reservationId,
    seats,
    status: "confirmed"
  });
};

exports.cancelReservation = async (req, res) => {
  const reservation = await Reservation.findOne({
    reservationId: req.params.id
  });

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  await Event.findOneAndUpdate(
    { eventId: "node-meetup-2025" },
    { $inc: { availableSeats: reservation.seats, version: 1 } }
  );

  await reservation.deleteOne();
  res.status(204).send();
};

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
};
