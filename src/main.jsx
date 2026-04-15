import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import DashBoard from "./components/DashBoard.jsx";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
import Profile from "./components/Profile.jsx";
import Calorie from "./components/Calorie.jsx";
import Workout from "./components/workout";
import WorkoutHistory from "./components/WorkoutHistory";
import CustomExercises from "./components/CustomExercises";
import Password from "./components/Password";
import SignUp from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/calorie", element: <Calorie /> },
      { path: "/workout", element: <Workout /> },
      { path: "/workouthistory", element: <WorkoutHistory /> },
      { path: "/customExercises", element: <CustomExercises /> },
      { path: "/password", element: <Password /> },
      { path: "/signup", element: <SignUp /> } 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
