import axios from "axios";
import { useState } from "react";

const CustomExercises = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [equipment, setEquipment] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://fittrack-backend-lcvs.onrender.com/exercises",
        {
          name,
          muscleGroup,
          category,
          equipment,
        },
        { withCredentials: true }
      );

      setSuccess("Exercise created successfully");
      setMessage("");
      setName("");
      setCategory("");
      setMuscleGroup("");
      setEquipment("");

      setTimeout(() => setSuccess(""), 2500);

    } catch (err) {
      setSuccess("");
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-success text-center mb-2">
            Add Custom Exercise
          </h2>

          <label className="label">Exercise Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Bench Press"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="label">Exercise Category</label>
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Shoulder">Shoulder</option>
            <option value="Abs">Abs</option>
          </select>

          <label className="label">Muscle Group</label>
          <select
            className="select select-bordered w-full"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            required
          >
            <option value="">Select Muscle Group</option>
            <option value="Upper Body">Upper Body</option>
            <option value="Lower Body">Lower Body</option>
            <option value="Full Body">Full Body</option>
          </select>

          <label className="label">Equipment</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Barbell / Dumbbell"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />

          {message && (
            <div className="text-center text-red-500 font-medium">
              {message}
            </div>
          )}

          {success && (
            <div className="text-center text-green-600 font-medium">
              {success}
            </div>
          )}

          <div className="card-actions justify-end mt-2">
            <button className="btn btn-success w-full" type="submit">
              Save Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomExercises;