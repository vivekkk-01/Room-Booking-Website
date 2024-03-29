import ClipLoader from "react-spinners/ClipLoader";
import React, { useState, useEffect } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import "./placeForm.css";

const PlaceForm = ({ place }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const placeId = useParams().placeId;

  useEffect(() => {
    if (placeId) {
      setTitle(place.title);
      setDescription(place.description);
      setAddress(place.address);
      setPerks(place.perks);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setExtraInfo(place.extraInfo);
      setAddedPhotos(place.photos);
      setPrice(place.price);
    }
  }, []);

  const submit = useNavigation();

  const isSubmitting = submit.state === "submitting";

  const userObj = JSON.parse(localStorage.getItem("landbnbUser"));

  const linkPhotoHandler = () => {
    if (photoLink) {
      setAddedPhotos((prev) => [...prev, photoLink]);
    }
    setPhotoLink("");
  };

  const deletePhotoHandler = (index) => {
    setAddedPhotos((prev) => prev.filter((elem, i) => i !== index));
  };

  const deleteFileHandler = (index) => {
    setFiles((prev) => prev.filter((elem, i) => i !== index));
  };

  const fileUploadHandler = (event) => {
    setFiles((prev) => [...prev, event.target.files[0]]);
  };

  const perksHandler = (event) => {
    if (event.target.checked) {
      setPerks((prev) => [...prev, event.target.name]);
    } else {
      setPerks((prev) => prev.filter((perk) => perk != event.target.name));
    }
  };

  const saveHandler = async () => {
    const body = new FormData();
    for (let i = 0; i < files.length; i++) {
      body.append("photos", files[i]);
    }
    for (let i = 0; i < addedPhotos.length; i++) {
      body.append("linkPhotos", addedPhotos[i]);
    }
    for (let i = 0; i < perks.length; i++) {
      body.append("perks", perks[i]);
    }
    body.append("description", description);
    body.append("info", extraInfo);
    body.append("address", address);
    body.append("title", title);
    body.append("checkIn", checkIn);
    body.append("checkOut", checkOut);
    body.append("maxGuests", maxGuests);
    body.append("price", price);
    let url = "https://room-booking-backend-iq12.onrender.com/place";
    let method = "POST";

    if (placeId) {
      url = `https://room-booking-backend-iq12.onrender.com/place/${place._id}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      body,
      headers: {
        authorization: `Bearer ${userObj.accessToken}`,
      },
    });
    const resData = await response.json();
    console.log(resData);
    if (!response.ok) {
      window.alert(resData.message);
      return null;
    }

    navigate("../places");
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-xl mt-4 font-bold">Title</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="border-gray-400"
        placeholder="title"
      />
      <h2 className="text-xl mt-4 font-bold">Address</h2>
      <input
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        type="text"
        className="border-gray-400"
        placeholder="address"
      />
      <h2 className="text-xl mt-4 font-bold">Photos</h2>
      <div className="flex items-center gap-2">
        <input
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
          type="text"
          className="border-gray-400"
          placeholder="Add using link..."
        />
        <button
          onClick={linkPhotoHandler}
          className="bg-gray-500 rounded-2xl text-white py-2 px-8"
        >
          Add
        </button>
      </div>
      <div className="mt-2 photoContainer grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => {
            return (
              <div className="relative" key={index}>
                <img
                  src={
                    photo.slice(0, 7) === "uploads"
                      ? "https://room-booking-backend-iq12.onrender.com/" + photo
                      : photo
                  }
                  className="rounded-2xl h-32 w-60 object-cover"
                />
                <button
                  onClick={deletePhotoHandler.bind(null, index)}
                  className="absolute deleteIcon right-10 bottom-2 text-white bg-primary p-2 bg-opacity-60 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        {files.length > 0 &&
          files.map((file, index) => {
            return (
              <div className="relative" key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-2xl h-32 w-60 object-cover"
                />
                <button
                  onClick={deleteFileHandler.bind(null, index)}
                  className="absolute deleteIcon right-10 bottom-2 text-white bg-primary p-2 bg-opacity-60 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        <label
          onClick
          className="border cursor-pointer border-gray-400 gap-1 text-xl bg-transparent rounded-2xl p-8 inline-flex items-center justify-center"
        >
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            hidden
            onChange={fileUploadHandler}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
      <h2 className="text-xl mt-4 font-bold">Description</h2>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="border-gray-400"
        style={{ height: "10rem", maxHeight: "10rem", minHeight: "10rem" }}
      />
      <h2 className="text-xl mt-4 font-bold">Perks</h2>
      <p>Select all the perks of your place</p>
      <div className="my-3 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="rounded-2xl border cursor-pointer border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("wifi")}
            name="wifi"
            onChange={perksHandler}
          />
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
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>

          <span>WiFi</span>
        </label>
        <label className="rounded-2xl cursor-pointer border border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("parking")}
            name="parking"
            onChange={perksHandler}
          />
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
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>

          <span>Free parking spot</span>
        </label>
        <label className="rounded-2xl cursor-pointer border border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("tv")}
            name="tv"
            onChange={perksHandler}
          />
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
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>

          <span>TV</span>
        </label>
        <label className="rounded-2xl cursor-pointer border border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("radio")}
            name="radio"
            onChange={perksHandler}
          />
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
              d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>

          <span>Radio</span>
        </label>
        <label className="rounded-2xl cursor-pointer border border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("pets")}
            name="pets"
            onChange={perksHandler}
          />
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
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>

          <span>Pets</span>
        </label>
        <label className="rounded-2xl cursor-pointer border border-gray-400 p-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={perks.includes("entrance")}
            name="entrance"
            onChange={perksHandler}
          />
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <span>Private entrance</span>
        </label>
      </div>
      <h2 className="text-xl mt-4 font-bold">Extra info</h2>
      <p className="text-gray-500 text-sm">house rules, etc...</p>
      <textarea
        value={extraInfo}
        onChange={(event) => setExtraInfo(event.target.value)}
        className="border-gray-400"
        style={{ height: "10rem", maxHeight: "10rem", minHeight: "10rem" }}
      />

      <h2 className="text-xl mt-4 font-bold">Check in & out times</h2>
      <div className="grid sm:grid-cols-2 gap-x-2 gap-y-1">
        <div>
          <h3 className="mt-4">Check in time</h3>
          <input
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="border-gray-400"
            type="text"
            placeholder="14:00"
          />
        </div>

        <div>
          <h3 className="mt-4">Check out time</h3>
          <input
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="border-gray-400"
            type="text"
            placeholder="20:00"
          />
        </div>

        <div>
          <h3 className="mt-4">Max number of guests</h3>
          <input
            value={maxGuests}
            onChange={(event) => setMaxGuests(event.target.value)}
            className="border-gray-400"
            type="text"
          />
        </div>
        <div>
          <h3 className="mt-4">Price per night</h3>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="border-gray-400"
            type="text"
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        onClick={saveHandler}
        className="my-4 primary"
      >
        {isSubmitting ? (
          <ClipLoader loading={isSubmitting} size={22} color="#fff" />
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
};

export default PlaceForm;
