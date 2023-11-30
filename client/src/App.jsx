import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Index, { loader as indexLoader } from "./pages/Index";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import Account from "./pages/Account";
import AccountRoot, { loader as accountLoader } from "./pages/AccountRoot";
import Places, { loader as placesLoader } from "./pages/Places";
import NewPlace from "./pages/NewPlace";
import EditPlace from "./pages/EditPlace";
import Place, { loader as placeLoader } from "./pages/Place";
import BookingPlace, { loader as bookingLoader } from "./pages/BookingPlace";
import BookingPlaces, { loader as bookingsLoader } from "./pages/BookingPlaces";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Index />,
    children: [
      { index: true, element: <Index />, loader: indexLoader },
      { path: "place/:placeId", element: <Place />, loader: placeLoader },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      { path: "register", element: <Register />, action: registerAction },
      {
        path: "account",
        element: <AccountRoot />,
        loader: accountLoader,
        children: [
          { index: true, element: <Account /> },
          {
            path: "bookings",
            element: <BookingPlaces />,
            loader: bookingsLoader,
          },
          {
            path: "bookings/:bookingId",
            element: <BookingPlace />,
            loader: bookingLoader,
          },
          { path: "places", element: <Places />, loader: placesLoader },
          { path: "places/new", element: <NewPlace /> },
          { path: "places/:placeId", element: <EditPlace /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
