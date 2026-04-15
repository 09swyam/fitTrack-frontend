import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://fittrack-backend-lcvs.onrender.com/logout",
        {},
        { withCredentials: true },
      );

      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="flex-1 mr-42">
        <Link to={"/dashboard"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-[180px]" />
        </Link>
      </div>

      {user && (
        <div className="hidden md:flex gap-12 font-semibold flex-6">
          <Link to="/dashboard" className="text-success text-xl font-bold hover:text-black transition">
            Dashboard
          </Link>

          <Link to="/calorie" className="text-success text-xl font-bold hover:text-black transition">
            Calories
          </Link>

          <Link to="/workout" className="text-success text-xl font-bold hover:text-black transition">
            Workout
          </Link>

          <Link to="/workouthistory" className="text-success text-xl font-bold hover:text-black transition">
            Workout History
          </Link>

          <Link to="/customexercises" className="text-success text-xl font-bold hover:text-black transition">
            Custom Exercises
          </Link>
        </div>
      )}

      {user && (
        <div className="flex gap-4 mr-6 items-center">
          <div className="text-2xl font-bold cursor-none">Welcome {user?.firstName}</div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 h-12 rounded-full">
                <img alt="profile" src={profile} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/password">Password</Link>
              </li>

              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
