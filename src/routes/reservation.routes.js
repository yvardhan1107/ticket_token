const router = require("express").Router();
const ctrl = require("../controllers/reservation.controller");

router.post("/", ctrl.reserveSeats);
router.delete("/:id", ctrl.cancelReservation);
router.get("/", ctrl.getReservations);

module.exports = router;
