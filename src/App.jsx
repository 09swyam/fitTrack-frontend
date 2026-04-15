import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return;

    try {
      const res = await axios.get(
        "https://fittrack-backend-lcvs.onrender.com/profile/view",
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const publicRoutes = ["/", "/signup"];

    if (!publicRoutes.includes(location.pathname)) {
      fetchUser();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;