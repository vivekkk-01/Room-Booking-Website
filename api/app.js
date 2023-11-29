const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/place");
const bookingRoutes = require("./routes/booking");

app.use(express.json());
app.use("/uploads", express.static(path.join("uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/place", placeRoutes);
app.use("/booking", bookingRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Couldn't find this route.", 404);
  next(error);
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.errorCode || 500);
  res.json({ message: err.message || "An unknown error occured!" });
  next(err);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Backend server is running...");
  app.listen(process.env.PORT);
});
