const Booking = require("../models/Booking");
const Place = require("../models/Place");
const HttpError = require("../models/http-error");

exports.postPlace = async (req, res, next) => {
  const { fullName, checkIn, checkOut, guests, phone, placeId, userId, price } =
    req.body;
  try {
    if (userId.toString() !== req.user.id.toString()) {
      const error = new HttpError("You couldn't book this place.", 421);
      return next(error);
    }

    const place = await Place.findById(placeId);

    if (place.owner.toString() == userId.toString()) {
      const error = new HttpError(
        "You couldn't book the place created by you!",
        421
      );
      return next(error);
    }

    const booking = new Booking({
      user: userId,
      fullName,
      checkIn,
      checkOut,
      guests,
      phone,
      price,
      place: placeId,
    });

    await booking.save();
    return res.json(booking);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again!", 500);
    return next(err);
  }
};

exports.getPlace = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id) {
      const error = new HttpError("You couldn't view this booking place.", 420);
      return next(error);
    }
    const booking = await Booking.findById(req.params.placeId).populate(
      "place"
    );
    return res.json(booking);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again!", 500);
    return next(err);
  }
};

exports.getPlaces = async (req, res, next) => {
  try {
    if (req.params.userId !== req.user.id) {
      const error = new HttpError("You couldn't view booking places.", 420);
      return next(error);
    }
    const booking = await Booking.find({ user: req.user.id }).populate("place");
    return res.json(booking);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again!", 500);
    return next(err);
  }
};
