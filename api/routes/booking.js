const verifyToken = require("../verifyToken");

const router = require("express").Router();

const bookingControllers = require("../controllers/booking");

router.post("/", verifyToken, bookingControllers.postPlace);

router.get("/:userId/:placeId", verifyToken, bookingControllers.getPlace);

router.get("/:userId", verifyToken, bookingControllers.getPlaces);

module.exports = router;
