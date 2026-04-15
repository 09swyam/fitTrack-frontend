import loginImage from "../assets/loginImage.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(
        "https://fittrack-backend-lcvs.onrender.com/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      setMessage(res.data.message);
      dispatch(addUser(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response.data.Error);
    }
  };

  return (
    <div className="h-[90.75vh] w-full flex">
      <div className="w-1/2 h-full">
        <img
          src={loginImage}
          alt="gym"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label mt-2">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="mt-2 text-center font-bold text-red-500">
                {message}
              </div>

              <button className="btn btn-neutral mt-4 w-full" type="submit">
                Login
              </button>
              <div className="text-md font-medium mt-4 text-center">
                New To FitTrack ? 
                <span className="cursor-pointer text-success" onClick={() => navigate('/signup')}> SignUp</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
