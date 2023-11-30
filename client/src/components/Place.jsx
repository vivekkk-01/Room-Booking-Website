import React from "react";
import { Link } from "react-router-dom";
import "./place.css";

const Place = ({ place }) => {
  return (
    <Link
      to={place._id}
      state={place}
      className="myPlace flex gap-4 bg-gray-200 rounded-2xl p-4 my-2"
    >
      <div className="place-img-container w-32 h-32 bg-gray-300 shrink-0">
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={
            place.photos[0].slice(0, 7) === "uploads"
              ? "https://room-booking-backend-iq12.onrender.com/" + place.photos[0]
              : place.photos[0]
          }
          alt=""
        />
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-2xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
    </Link>
  );
};

export default Place;
