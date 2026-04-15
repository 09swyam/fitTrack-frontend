import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setHeight(user.height || "");
      setWeight(user.weight || "");
      setGoal(user.goal || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://fittrack-backend-lcvs.onrender.com/profile/edit",
        {
          firstName,
          lastName,
          age,
          height,
          weight,
          goal,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      setMessage(res.data.message);
      dispatch(addUser(res.data.user));
    } catch (err) {
      setMessage(err.response.data.Error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-2xl bg-base-100">
      <div className="text-3xl font-extrabold text-center mb-6">My Profile</div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="label text-base-content font-semibold">
          First Name
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder={user?.firstName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label text-base-content font-semibold">
          Last Name
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder={user?.lastName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label text-base-content font-semibold">Age</label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder={user?.age}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label text-base-content font-semibold">
          Height (cm)
        </label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder={user?.height}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label className="label text-base-content font-semibold">
          Weight (kg)
        </label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder={user?.weight}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <label className="label text-base-content font-semibold">Goal</label>
        <select
          className="select select-bordered w-full"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="" disabled>
            {user?.goal ? user.goal : "Select your goal"}
          </option>
          <option value="lose weight">Lose Weight</option>
          <option value="gain muscle">Gain Muscle</option>
          <option value="maintain weight">Maintain Weight</option>
        </select>

        <label className="label text-base-content font-semibold">
          Daily Calories Goal
        </label>
        <input
          type="number"
          className="input input-bordered w-full bg-base-200"
          placeholder={user?.dailyCalorieGoal}
          disabled
        />

        <div className="text-center font-semibold text-red-500">{message}</div>

        <button className="btn btn-neutral mt-3 w-full" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
