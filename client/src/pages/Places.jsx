import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Place from "../components/Place";

const Places = () => {
  const data = useLoaderData();
  return (
    <div>
      <div className="mt-8 text-center">
        <Link
          to="new"
          className="inline-flex gap-1 py-2 px-6 bg-primary rounded-full text-white items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 gap-y-3">
        {data.map((place) => {
          return <Place key={place._id} place={place} />;
        })}
      </div>
    </div>
  );
};

export default Places;

export const loader = async () => {
  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));
  const response = await fetch(
    `https://room-booking-backend-iq12.onrender.com/place/${userObj.userId}`,
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
