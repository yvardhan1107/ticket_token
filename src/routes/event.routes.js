const router = require("express").Router();
const ctrl = require("../controllers/event.controller");

router.get("/summary", ctrl.getEventSummary);

module.exports = router;
