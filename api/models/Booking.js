const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  place: { type: Schema.Types.ObjectId, required: true, ref: "Place" },
  price: { type: Number, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
