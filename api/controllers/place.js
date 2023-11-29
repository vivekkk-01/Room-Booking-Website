const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Place = require("../models/Place");

exports.postPlace = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }

  try {
    const {
      description,
      address,
      info,
      perks,
      linkPhotos,
      title,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (req.files.length === 0 && linkPhotos?.length === 0) {
      error = new HttpError("Add atleast one photo of your place.", 422);
      return next(error);
    }

    let photos = [];

    req.files?.map((file) => {
      photos.push(file.path);
    });

    typeof linkPhotos === "array" || typeof linkPhotos === "object"
      ? linkPhotos.map((photo) => photos.push(photo))
      : typeof linkPhotos === "string"
      ? photos.push(linkPhotos)
      : null;

    const place = new Place({
      owner: req.user.id,
      title,
      address,
      description,
      perks: perks && [...perks],
      extraInfo: info,
      checkIn,
      checkOut,
      price,
      maxGuests: Number(maxGuests),
      photos: [...photos],
    });

    await place.save();
    return res.json({ message: "Place created successfully" });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again later", 500);
    return next(err);
  }
};

exports.getPlace = async (req, res, next) => {
  try {
    const places = await Place.find({ owner: req.params.userId });
    return res.json(places);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again later", 500);
    return next(err);
  }
};

exports.putPlace = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    error = new HttpError(error.array()[0].msg, 422);
    return next(error);
  }

  try {
    const {
      description,
      address,
      info,
      perks,
      linkPhotos,
      title,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (req.files.length === 0 && linkPhotos?.length === 0) {
      error = new HttpError("Add atleast one photo of your place.", 422);
      return next(error);
    }

    let photos = [];

    req.files?.map((file) => {
      photos.push(file.path);
    });

    typeof linkPhotos === "array" || typeof linkPhotos === "object"
      ? linkPhotos.map((photo) => photos.push(photo))
      : typeof linkPhotos === "string"
      ? photos.push(linkPhotos)
      : null;

    const place = await Place.findById(req.params.placeId);
    if (place.owner.toString() !== req.user.id) {
      error = new Http("You couldn't edit this place", 421);
      return next(error);
    }

    console.log(place);

    place.set({
      title,
      address,
      description,
      perks: perks && [...perks],
      extraInfo: info,
      checkIn,
      checkOut,
      price,
      maxGuests: Number(maxGuests),
      photos: [...photos],
    });

    await place.save();
    return res.json({ message: "Place updated successfully" });
  } catch (err) {
    err = new HttpError("Something went wrong, please try again later", 500);
    return next(err);
  }
};

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    return res.json(places);
  } catch (err) {
    err = new HttpError("Something went wrong, please try again later", 500);
    return next(err);
  }
};
