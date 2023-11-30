import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import BookingPlace from "../components/BookingPlace";

const BookingPlaces = () => {
  const data = useLoaderData();
  return (
    <div>
      {data.length > 0 && (
        <div className="mt-4">
          {data.map((place) => {
            return <BookingPlace key={place._id} place={place} />;
          })}
        </div>
      )}
      {data.length == 0 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-center my-10">
            You have 0 bookings
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-1 bg-primary rounded-full py-3 px-6 text-white font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
            Explore Places
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingPlaces;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));

  const response = await fetch(
    "https://room-booking-backend-iq12.onrender.com/booking/" + userObj.userId,
    {
      headers: {
        authorization: `Bearer ${userObj.accessToken}`,
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    window.alert(resData.message);
    return;
  }
  return resData;
};
