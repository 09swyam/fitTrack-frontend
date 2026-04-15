import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";

const WorkoutHistory = () => {
  const [date, setDate] = useState(new Date());
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [noWorkout, setNoWorkout] = useState(false);

  useEffect(() => {
    if (!date) return;

    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    fetchWorkout(formatted);
  }, [date]);

  const fetchWorkout = async (selectedDate) => {
    try {
      const res = await axios.get(
        `https://fittrack-backend-lcvs.onrender.com/workout/${selectedDate}`,
        { withCredentials: true }
      );

      if (typeof res.data === "string") {
        setNoWorkout(true);
        setTodayWorkout(null);
      } else {
        setNoWorkout(false);
        setTodayWorkout(res.data);
      }
    } catch (err) {
      console.log(err);
      setNoWorkout(true);
      setTodayWorkout(null);
    }
  };

  const displayDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

  return (
    <div className="flex gap-6 p-4 items-start h-screen">
      
      {/* calendar */}
      <div className="w-[280px]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border shadow-md p-3"
        />
      </div>

      {/* workout panel */}
      <div className="flex-1">
        <h1 className="font-bold text-success text-2xl mb-4">
          {displayDate} Workout
        </h1>

        {noWorkout && (
          <div className="bg-gray-100 p-6 rounded-xl text-gray-500 text-lg">
            No workout found for this day
          </div>
        )}

        {todayWorkout?.exercises?.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {todayWorkout.exercises.map((exercise) => (
              <div
                key={exercise.exerciseId}
                className="w-[260px] border bg-gray-100 rounded-xl p-3 shadow-lg"
              >
                <h1 className="text-lg font-bold text-success mb-2">
                  {exercise.name?.toUpperCase() || "CUSTOM EXERCISE"}
                </h1>

                {exercise.sets?.map((set, index) => (
                  <div key={index} className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Set {index + 1} →
                    </span>
                    <span>{set.reps} reps</span>
                    <span>{set.weight} kg</span>
                  </div>
                ))}

                <div className="mt-2 text-sm">
                  <span className="font-semibold">Duration :</span>{" "}
                  {exercise.duration} min
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;