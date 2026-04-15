import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import calConsumed from "../assets/calLogo2.jpg";
import WeeklyCaloriesChart from "./WeeklyCaloriesChart";
import { useSelector } from "react-redux";

const Calorie = () => {
  const user = useSelector((store) => store.user);
  const [date, setDate] = useState(new Date());
  const [cal, setCal] = useState("");
  const [weeklyCalorieData, setWeeklyCalorieData] = useState([]);

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

  useEffect(() => {
    if (!date) return;
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    fetchCalorires(formatted);
    fetchWeeklyCalories();
  }, [date]);

  const fetchCalorires = async (selectedDate) => {
    try {
      const res = await axios.get(
        `https://fittrack-backend-lcvs.onrender.com/calories/${selectedDate}`,
        { withCredentials: true },
      );

      setCal(res.data.consumed);
    } catch (err) {
      console.log(err);
    }
  };

  const displayDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;

  return (
    <div className="p-32 flex px-6 items-center justify-around gap-24">
      <div className="flex gap-10">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border bg-black text-white h-1/2"
        />

        <div className="bg-base-100 p-5 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-base text-success">
              {displayDate} Calories Intake
            </h1>

            <img
              src={calConsumed}
              alt="cal"
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>

          <div className="flex items-end gap-2">
            <div className="text-4xl font-extrabold">{cal}</div>
            <div className="text-lg font-semibold opacity-70">kcal</div>
          </div>

          <div className="text-sm opacity-60 mt-2">
            Calories consumed on selected date
          </div>
        </div>
      </div>

      <div className="w-[40%] ">
        <WeeklyCaloriesChart
          data={weeklyCalorieData}
          dailyGoal={user?.dailyCalorieGoal}
        />
      </div>
    </div>
  );
};

export default Calorie;
