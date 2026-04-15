import { useSelector } from "react-redux";
import calTarget from "../assets/calTarget.png";
import calConsumed from "../assets/calLogo2.jpg";
import streak from "../assets/streak.png";
import { useEffect, useState } from "react";
import axios from "axios";
import WeeklyCaloriesChart from "./WeeklyCaloriesChart";

const DashBoard = () => {
  const user = useSelector((store) => store.user);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [updateCalories, setUpdateCalories] = useState("");
  const [weeklyCalorieData, setWeeklyCalorieData] = useState([]);
  const [calorieStreak, setCalorieStreak] = useState("");
  const [workoutStreak, setWorkoutStreak] = useState("");

  const fetchTodaysCalories = async () => {
    try {
      const res = await axios.get("https://fittrack-backend-lcvs.onrender.com/calories/today", {
        withCredentials: true,
      });
      setConsumedCalories(res.data.consumed);
    } catch (err) {
      console.error("Failed to fetch today's calories:", err);
    }
  };

  const fetchWeeklyCalories = async () => {
    try {
      const res = await axios.get("https://fittrack-backend-lcvs.onrender.com/calories/weekly", {
        withCredentials: true,
      });

      setWeeklyCalorieData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCalorieStreak = async () => {
    try {
      const res = await axios.get("https://fittrack-backend-lcvs.onrender.com/calories/streak", {
        withCredentials: true,
      });
      setCalorieStreak(res.data.streak);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWorkoutStreak = async () => {
    try {
      const res = await axios.get("https://fittrack-backend-lcvs.onrender.com/workout/streak", {
        withCredentials: true,
      });
      console.log(res.data)
      setWorkoutStreak(res.data.streak);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCaloriesHandeler = async () => {
    try {
      await axios.patch(
        "https://fittrack-backend-lcvs.onrender.com/calories",
        {
          calories: Number(updateCalories),
        },
        { withCredentials: true },
      );
      fetchTodaysCalories();
      fetchWeeklyCalories();
      fetchCalorieStreak();
      setUpdateCalories("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodaysCalories();
    fetchWeeklyCalories();
    fetchCalorieStreak();
    fetchWorkoutStreak();
  }, []);

  return (
    <div className="h-screen">
      <div className="flex gap-8 justify-around mt-5">
        <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-base text-success">
              Daily Calories Target
            </h1>
            <img
              src={calTarget}
              alt="cal"
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-extrabold">
              {user?.dailyCalorieGoal}
            </div>
            <div className="text-lg font-semibold opacity-70">kcal</div>
          </div>
          <div className="text-sm opacity-60 mt-2">
            Complete your daily calories
          </div>
        </div>

        <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-base text-success">
              Today's Calories Intake
            </h1>
            <img
              src={calConsumed}
              alt="cal"
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-extrabold">{consumedCalories}</div>
            <div className="text-lg font-semibold opacity-70">kcal</div>
          </div>
          <div className="text-sm opacity-60 mt-2">
            Complete your daily calories
          </div>
        </div>

        <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-base text-success">
              Add Today's Calories
            </h1>
            <img
              src={calTarget}
              alt="cal"
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-end gap-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="0"
                value={updateCalories}
                onChange={(e) => setUpdateCalories(e.target.value)}
              />
              <div className="text-lg font-semibold opacity-70">kcal</div>
            </div>
            <button
              className="bg-green-300 p-1 text-2xl text-white font-bold px-4 rounded-xl cursor-pointer hover:bg-green-400"
              onClick={updateCaloriesHandeler}
            >
              Add
            </button>
          </div>
          <div className="text-sm opacity-60 mt-2">
            Complete your daily calories
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-24 mt-10">
        <div className="w-[40%] ">
          <WeeklyCaloriesChart
            data={weeklyCalorieData}
            dailyGoal={user?.dailyCalorieGoal}
          />
        </div>

        <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-base text-success">Streaks</h1>
            <img
              src={streak}
              alt="cal"
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-base text-success">Calorie Streak</h1>
            <div className="flex items-end gap-2">
              <div className="text-6xl font-extrabold">{calorieStreak}</div>
              <div className="text-lg font-semibold opacity-70">
                days streak
                <span className="text-4xl animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                  🔥
                </span>
              </div>
            </div>
            <div className="text-sm opacity-60 mt-2">
              Maintain your calorie streak
            </div>
          </div>
          <div className="mt-8">
            <h1 className="font-bold text-base text-success">Workout Streak</h1>
            <div className="flex items-end gap-2">
              <div className="text-6xl font-extrabold">{workoutStreak}</div>
              <div className="text-lg font-semibold opacity-70">
                days streak
                <span className="text-4xl animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                  🔥
                </span>
              </div>
            </div>
            <div className="text-sm opacity-60 mt-2">
              Maintain your workout streak
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
