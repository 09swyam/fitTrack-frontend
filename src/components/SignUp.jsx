import loginImage from "../assets/loginImage.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fittrack-backend-lcvs.onrender.com/signup",
        {
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
          height,
          weight,
          goal,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/dashboard");

    } catch (err) {
      setMessage(err.response?.data?.Error || "Signup failed");
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] flex overflow-hidden">
      
      {/* LEFT IMAGE */}
      <div className="w-1/2 h-full">
        <img
          src={loginImage}
          alt="gym"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 w-full max-w-md shadow-2xl max-h-[85vh]">
          
          <div className="card-body overflow-y-auto">
            <h2 className="text-2xl font-bold text-success text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2">

              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="number"
                placeholder="Height (cm)"
                className="input input-bordered w-full"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <select
                className="select select-bordered w-full"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="">Select Goal</option>
                <option value="lose weight">Lose Weight</option>
                <option value="gain muscle">Gain Muscle</option>
                <option value="maintain weight">Maintain Weight</option>
              </select>

              {message && (
                <div className="text-red-500 text-center font-medium">
                  {message}
                </div>
              )}

              <button className="btn btn-success w-full mt-2">
                Sign Up
              </button>

              <div className="text-center text-sm">
                Account Exist ?
                <span
                  className="text-success cursor-pointer ml-1"
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;