import axios from "axios";
import { useState } from "react";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "https://fittrack-backend-lcvs.onrender.com/profile/password",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      setSuccess(res.data.message || "Password updated successfully");
      setMessage("");

      setOldPassword("");
      setNewPassword("");

      setTimeout(() => setSuccess(""), 2500);

    } catch (err) {
      setSuccess("");
      setMessage(
        err.response?.data?.Error || "Failed to update password"
      );
    }
  };

  return (
    <div className="h-screen flex items-start justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl mt-20">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-success text-center">
            Change Password
          </h2>

          <label className="label font-semibold">
            Old Password
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label className="label font-semibold">
            New Password
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

          <button className="btn btn-success mt-3 w-full" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;