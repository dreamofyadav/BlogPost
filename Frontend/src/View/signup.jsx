import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend ko request bhejna
      const res = await axios.post("https://blogpost-q2as.onrender.com/auth/signup", form);

      // console.log("Signup Success:", res.data);
      toast.success(`Signup successful! Welcome`);
      // alert(`Signup successful! Please login now.`);
      setForm({ name: "", email: "", password: "" }); // form ko khali krna
      //Redirect to login form 
      navigate("/login");
    } catch (err) {
      // console.error(err);
      toast.error("SignUp Failed");
      // alert("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Signup
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <button type="submit"  disabled={loading}
          className={`w-full py-2 rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`} >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
          </Link>
        </p>
      </form>
    </div>
  );
}
