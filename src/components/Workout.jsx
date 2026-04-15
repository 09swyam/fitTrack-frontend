import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercises } from "@/utils/exerciseSlice";

const Workout = () => {
  const [category, setCategory] = useState("Chest");
  const [exerciseList, setExerciseList] = useState([]);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [popup, setPopup] = useState("");

  const selectedExercises = useSelector((store) => store.exercise);
  const user = useSelector((store) => store.user);

  const todayDate = new Date();
  const dispatch = useDispatch();

  const getExercises = async () => {
    try {
      const res = await axios.get(
        `https://fittrack-backend-lcvs.onrender.com/exercises/${category}`,
        { withCredentials: true }
      );
      setExerciseList(res.data.exercises);
    } catch (err) {
      console.log(err);
    }
  };

  const getTodayWorkout = async () => {
    try {
      const res = await axios.get(
        "https://fittrack-backend-lcvs.onrender.com/workout/today",
        { withCredentials: true }
      );
      setTodayWorkout(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addWorkoutHandler = async () => {
    try {
      const res = await axios.post(
        "https://fittrack-backend-lcvs.onrender.com/workout",
        {
          userId: user._id,
          date: todayDate,
          exercises: selectedExercises,
        },
        { withCredentials: true }
      );

      setPopup("Workout created successfully");
      setTodayWorkout(res.data.workout);
      dispatch(deleteExercises());

    } catch (err) {
      setPopup(err.response?.data?.error);

      if (err.response?.data?.workout) {
        setTodayWorkout(err.response.data.workout);
      }

      dispatch(deleteExercises());
    }

    setTimeout(() => setPopup(""), 2500);
  };

  const deleteWorkoutHandler = async () => {
    try {
      await axios.delete(
        `https://fittrack-backend-lcvs.onrender.com/workout/${todayWorkout._id}`,
        { withCredentials: true }
      );

      setPopup("Workout deleted");
      setTodayWorkout(null);

    } catch (err) {
      setPopup("Failed to delete workout");
    }

    setTimeout(() => setPopup(""), 2500);
  };

  useEffect(() => {
    getExercises();
    getTodayWorkout();
  }, [category]);

  return (
    <div className="flex gap-2">

      {/* popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {popup}
        </div>
      )}

      {/* LEFT PANEL */}
      <div className="w-[26.5%] h-screen flex flex-col ml-4">
        <select
          className="select select-bordered border border-black text-xl w-full my-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Abs">Abs</option>
        </select>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {exerciseList.map((exe) => (
            <ExerciseCard key={exe._id} exe={exe} />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full border rounded-xl px-4">
        <h1 className="text-2xl text-success font-bold my-4">
          Create Today's Workout
        </h1>

        <div className="w-full flex gap-4 flex-wrap">
          {selectedExercises.map((exercise) => (
            <div
              key={exercise.exerciseId}
              className="border w-1/4 bg-gray-100 rounded-xl p-2 shadow-xl"
            >
              <h1 className="text-xl font-bold text-success my-2">
                {exercise.name.toUpperCase()}
              </h1>

              {exercise.sets.map((set, index) => (
                <div key={index} className="flex gap-2">
                  <div className="font-bold">Set {index + 1} →</div>
                  <div>Reps : {set.reps}</div>
                  <div>Weight : {set.weight}</div>
                </div>
              ))}

              <div className="my-2">
                Duration : {exercise.duration} min
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end my-4">
          <button
            onClick={addWorkoutHandler}
            className="bg-gray-100 font-bold p-2 border-2 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            ADD WORKOUT
          </button>
        </div>

        {/* TODAY WORKOUT */}
        <h1 className="text-2xl text-success font-bold my-4">
          Today's Workout
        </h1>

        {todayWorkout?.exercises && (
          <>
            <div className="flex gap-4 flex-wrap">
              {todayWorkout.exercises.map((exercise) => (
                <div
                  key={exercise.exerciseId}
                  className="border w-1/4 bg-gray-100 rounded-xl p-2 shadow-xl"
                >
                  <h1 className="text-xl font-bold text-success my-2">
                    {exercise.name.toUpperCase()}
                  </h1>

                  {exercise.sets.map((set, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="font-bold">
                        Set {index + 1} →
                      </div>
                      <div>Reps : {set.reps}</div>
                      <div>Weight : {set.weight}</div>
                    </div>
                  ))}

                  <div className="my-2">
                    Duration : {exercise.duration} min
                  </div>
                </div>
              ))}
            </div>

            {/* DELETE BUTTON BELOW */}
            <div className="flex justify-end mt-4">
              <button
                onClick={deleteWorkoutHandler}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg border hover:bg-red-200 font-semibold"
              >
                DELETE WORKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Workout;