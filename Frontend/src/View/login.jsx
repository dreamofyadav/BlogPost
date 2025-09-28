import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
   const [loading, setLoading] = useState(false);
  
   const handleChange = (e) => {
    setForm({ ...form ,[e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend ko request bhejna
      const res = await axios.post("http://localhost:3001/auth/login", form);

       localStorage.setItem("token", res.data.token);
      // console.log("Login Success:", res.data);
      // alert(`Login successful! Welcome ${res.data.user.name}`);
    // setForm({ email: "", password: "" });
      toast.success(`Login successful! Welcome ${res.data.user.name}`);
        navigate("/");

     } catch (err) {
        // console.error(err);
        toast.error("Login failed! Please check your credentials.");
     } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
         required />
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white  cursor-pointer transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {loading ? "Logging in..." : "Login"}
        </button>

             <p className="mt-4 text-center text-gray-600">
                  Please Create an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                     Signup
                  </Link>
            </p>
      </form>
    </div>
  );
}
