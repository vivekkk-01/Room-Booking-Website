import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { differenceInDays } from "date-fns";
import "../components/./bookingPlace.css";

const BookingPlace = () => {
  const [showPhotos, setShowPhotos] = useState(false);

  const data = useLoaderData();
  let numberOfNights = differenceInDays(
    new Date(data.checkOut),
    new Date(data.checkIn)
  );

  if (showPhotos) {
    return (
      <div className="min-h-screen inset-0 absolute bg-black">
        <div className={`p-10 gap-4 grid bg-black`}>
          <button
            onClick={() => setShowPhotos(false)}
            className="fixed flex items-center shadow shadow-md shadow-gray-500 gap-1 bg-white text-black py-2 px-4 rounded-2xl right-3 top-5"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close photos
          </button>
          {data.place.photos.map((photo, index) => {
            return (
              <img
                key={index}
                className="w-screen object-contain"
                src={
                  photo.slice(0, 7) === "uploads"
                    ? "https://room-booking-backend-iq12.onrender.com/" + photo
                    : photo
                }
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl">{data.place.title}</h1>
      <a
        className="my-3 gap-1 text-xs font-semibold underline flex items-center"
        target="_blank"
        href={"https://maps.google.com/?q=" + data.place.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {data.place.address}
      </a>
      <div className="booking-info-container grid grid-cols-[6fr_1fr] p-6 bg-gray-300 rounded-2xl">
        <div>
          <h2 className="text-2xl font-semibold">Your booking information:</h2>
          <br />
          <div className="flex items-center gap-2">
            <div className="flex gap-1 items-center nights">
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
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>

              <span>
                {numberOfNights} {numberOfNights > 1 ? "nights:" : "night:"}
              </span>
            </div>
            <div className="flex items-center gap-1">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {data.checkIn}
            </div>
            <p className="text-3xl">&rarr;</p>
            <div className="flex items-center gap-1">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {data.checkOut}
            </div>
          </div>
        </div>
        <div className="totalPrice bg-primary py-3 px-6 text-xl rounded-2xl text-center text-white flex-shrink">
          Total price: <br />
          <span className="text-3xl">${data.price}</span>
        </div>
      </div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] my-2">
          <div>
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer rounded-l-3xl w-full h-full object-cover aspect-square"
              src={
                data.place.photos[0].slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" + data.place.photos[0]
                  : data.place.photos[0]
              }
            />
          </div>
          <div className="grid gap-2">
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer w-full h-full object-cover aspect-square"
              src={
                data.place.photos[1]?.slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" + data.place.photos[1]
                  : data.place.photos[1]
              }
            />
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer w-full h-full object-cover aspect-square"
              src={
                data.place.photos[2]?.slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" + data.place.photos[2]
                  : data.place.photos[2]
              }
            />
          </div>
        </div>
        {data.place.photos.length > 3 && (
          <button
            onClick={() => setShowPhotos(true)}
            className="absolute right-3 bottom-3 py-2 bg-white shadow shadow-md shadow-gray-500 rounded-2xl  px-4 flex gap-1"
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show more photos
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingPlace;

export const loader = async ({ params }) => {
  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));
  const bookingId = params.bookingId;
  const response = await fetch(
    `https://room-booking-backend-iq12.onrender.com/booking/${userObj.userId}/${bookingId}`,
    {
      headers: {
        authorization: `Bearer ${userObj.accessToken}`,
      },
    }
  );
  const resData = await response.json();
  if (!response.ok) {
    window.alert(resData.message);
    return null;
  }
  return resData;
};
