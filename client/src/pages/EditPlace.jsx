import React from "react";
import { useLocation } from "react-router-dom";
import PlaceForm from "../components/PlaceForm";

const EditPlace = () => {
  const { state } = useLocation();
  return <PlaceForm place={state} />;
};

export default EditPlace;
