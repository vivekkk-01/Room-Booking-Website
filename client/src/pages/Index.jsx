import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Index = () => {
  const data = useLoaderData();
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((place) => {
        return (
          <Link to={`place/${place._id}`} key={place._id} state={place}>
            <div className="mb-2 rounded-2xl bg-gray-500 flex">
              <img
                className="rounded-2xl object-cover aspect-square"
                src={
                  place.photos[0].slice(0, 7) === "uploads"
                    ? "http://localhost:8080/" + place.photos[0]
                    : place.photos[0]
                }
                alt=""
              />
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Index;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/place");
  return response;
};
