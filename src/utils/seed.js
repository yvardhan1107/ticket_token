const Event = require("../models/event.model");

const seedEvent = async () => {
  const exists = await Event.findOne({ eventId: "node-meetup-2025" });
  if (!exists) {
    await Event.create({
      eventId: "node-meetup-2025",
      name: "Node.js Meet-up",
      totalSeats: 500,
      availableSeats: 500,
      version: 0
    });
    console.log("Event seeded");
  }
};

module.exports = seedEvent;
