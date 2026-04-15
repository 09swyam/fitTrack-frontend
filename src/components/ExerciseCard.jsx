import { addExercise } from "@/utils/exerciseSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ExerciseCard = ({ exe }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);
  const [duration, setDuration] = useState("");

  const updateSetChange = (index, field, value) => {
    const updated = [...sets];
    updated[index][field] = value;
    setSets(updated);
  };

  const addSet = () => {
    setSets([...sets, { reps: "", weight: "" }]);
  };

  const handleSumbit = () => {
    dispatch(
      addExercise({
        exerciseId: exe._id,
        name: exe.name,
        sets: sets,
        duration: duration
      })
    );
    setIsOpen(false);
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm rounded-xl mb-2">
        <div className="card-body">
          <h2 className="card-title text-xl text-success">
            {exe.name.toUpperCase()}
          </h2>

          <div>
            <div className="font-bold text-lg">
              Category :
              <span className="font-medium text-lg text-gray-500">
                {exe.category}
              </span>
            </div>

            <div className="font-bold text-lg">
              Equipments :
              <span className="font-medium text-lg text-gray-500">
                {exe.equipment}
              </span>
            </div>

            <div className="font-bold text-lg">
              MuscleGroup :
              <span className="font-medium text-lg text-gray-500">
                {exe.muscleGroup}
              </span>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button className="btn" onClick={() => setIsOpen(true)}>
              ADD
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-3">{exe.name.toUpperCase()}</h2>

            {sets.map((set, index) => (
              <div key={index} className="flex gap-4 my-2">
                <input
                  className="w-1/2 border border-black rounded-sm p-2"
                  type="number"
                  placeholder="reps"
                  value={set.reps}
                  onChange={(e) =>
                    updateSetChange(index, "reps", e.target.value)
                  }
                />
                <input
                  className="w-1/2 border border-black rounded-sm p-2"
                  type="number"
                  placeholder="weight"
                  value={set.weight}
                  onChange={(e) =>
                    updateSetChange(index, "weight", e.target.value)
                  }
                />
              </div>
            ))}

            <button className="btn" onClick={addSet}>
              + ADD SET
            </button>

            <input
              type="number"
              placeholder="Duration (min)"
              className="border border-black rounded-sm p-2 w-full my-2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />


            <div className="flex justify-between mt-2">
              <button className="btn" onClick={handleSumbit}>
                ADD EXERCISE
              </button>
              <button className="btn" onClick={() => setIsOpen(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseCard;
