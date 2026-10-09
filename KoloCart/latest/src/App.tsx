import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { type JSX } from "react";
import SplashScreen from "./pages/SplashScreen";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Verify from "./pages/Verification";
import OnBoarding from "./pages/OnBoarding"
import Location from "./pages/Location"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/onboarding",
    element: <OnBoarding />,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
