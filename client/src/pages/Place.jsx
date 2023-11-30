import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";
import "./place.css";

const Place = () => {
  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showPhotos, setShowPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFullName(userObj.name);
  }, [userObj.name]);

  let numberOfDays = null;
  if (checkIn && checkOut) {
    numberOfDays = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const bookingHandler = async () => {
    setIsSubmitting(true);
    const body = {
      checkIn,
      checkOut,
      fullName,
      phone,
      guests,
      price: numberOfDays * Number(state.price),
      placeId: state._id,
      userId: userObj.userId,
    };
    const response = await fetch(
      "https://room-booking-backend-iq12.onrender.com/booking",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${userObj.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const resData = await response.json();
    if (!response.ok) {
      setIsSubmitting(false);
      window.alert(resData.message);
      return null;
    }
    setIsSubmitting(false);
    navigate("/account/bookings/" + resData._id);
  };

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
          {state.photos.map((photo, index) => {
            return (
              <img
                className="w-screen object-contain"
                key={photo + index}
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
    <div className="my-4 py-4 px-10 w-screen relative right-4 bg-gray-200 overflow-x-hidden">
      <h1 className="text-3xl">{state.title}</h1>
      <a
        className="my-3 gap-1 text-xs font-semibold underline flex items-center"
        target="_blank"
        href={"https://maps.google.com/?q=" + state.address}
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

        {state.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] my-2">
          <div>
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer rounded-l-3xl w-full h-full object-cover aspect-square"
              src={
                state.photos[0].slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" +
                    state.photos[0]
                  : state.photos[0]
              }
            />
          </div>
          <div className="grid gap-2">
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer w-full h-full object-cover aspect-square"
              src={
                state.photos[1]?.slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" +
                    state.photos[1]
                  : state.photos[1]
              }
            />
            <img
              onClick={() => setShowPhotos(true)}
              className="cursor-pointer w-full h-full object-cover aspect-square"
              src={
                state.photos[2]?.slice(0, 7) === "uploads"
                  ? "https://room-booking-backend-iq12.onrender.com/" +
                    state.photos[2]
                  : state.photos[2]
              }
            />
          </div>
        </div>
        {state.photos.length > 3 && (
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

      <div className="place-detail-container grid gap-2 my-3 grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-bold text-2xl">Description</h2>
          <p className="text-sm my-2">{state.description}</p>
          <p className="">
            Check In: <b>{state.checkIn}</b>
          </p>
          <p className="">
            Check Out: <b>{state.checkOut}</b>
          </p>
          <p className="">
            Max number of guests: <b>{state.maxGuests}</b>
          </p>
        </div>
        <div className="bg-white p-4 my-3 rounded-2xl">
          <h2 className="text-center text-xl font-semibold">
            Price ${state.price}/per night
          </h2>
          <div className="border border-gray-500 rounded-2xl my-4">
            <div className="grid grid-cols-[1fr_1fr] border-b border-gray-500">
              <div className="p-2 border-r border-gray-500">
                Check in: <br />
                <input
                  onChange={(event) => setCheckIn(event.target.value)}
                  type="date"
                />
              </div>
              <div className="p-2">
                Check out: <br />
                <input
                  onChange={(event) => setCheckOut(event.target.value)}
                  type="date"
                />
              </div>
            </div>
            <div className="py-3 px-4">
              <p className="font-semibold">Number of guests:</p>
              <input
                min="1"
                max="5"
                onChange={(event) => setGuests(event.target.value)}
                className="w-full my-2 border py-1 px-2 rounded-2xl border-gray-500 outline-none"
                type="number"
                value={guests}
              />
              {checkIn && checkOut && (
                <>
                  <p className="font-semibold">Your Full Name:</p>
                  <input
                    onChange={(event) => setFullName(event.target.value)}
                    className="w-full my-2 border py-1 px-2 rounded-2xl border-gray-500 outline-none"
                    type="text"
                    value={fullName}
                    maxLength="20"
                  />
                  <p className="font-semibold">Your Phone Number:</p>
                  <input
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full my-2 border py-1 px-2 rounded-2xl border-gray-500 outline-none"
                    type="tel"
                    value={phone}
                    maxLength="10"
                  />{" "}
                </>
              )}
            </div>
          </div>
          <button
            disabled={
              !isSubmitting &&
              phone.length == 10 &&
              fullName.length !== 0 &&
              (Number(guests) >= 1 || Number(guests) < 6)
                ? false
                : true
            }
            onClick={bookingHandler}
            className="bg-primary p-2 text-white text-center w-full rounded-2xl"
          >
            {isSubmitting && (
              <ClipLoader loading={isSubmitting} size={22} color="#fff" />
            )}
            {!isSubmitting && "Book this place"}
            {!isSubmitting && checkIn && checkOut && numberOfDays > 0 && (
              <span> ${numberOfDays * state.price}</span>
            )}
          </button>
        </div>
      </div>
      <div className="my-4 py-4 px-10 w-screen relative -mx-10 bg-white overflow-x-hidden">
        <h2 className="font-bold text-2xl">Extra info</h2>
        <p>{state.extraInfo}</p>
      </div>
    </div>
  );
};

export default Place;

export const loader = () => {
  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));
  if (!userObj) {
    return redirect("/login");
  }
  return null;
};
