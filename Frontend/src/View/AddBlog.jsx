import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    category: "",
  });

  const [loading, setLoading] = useState(false); // loading state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple submits

    setLoading(true); // start loading
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Blog Created Successfullly!");
      // alert("Blog created successfully!");
      navigate("/");
      setForm({
        title: "",
        description: "",
        content: "",
        image: null,
        category: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create Blog");
      // alert(err.response?.data?.message || "Failed to create blog!");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Create New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter short description"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            required
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog here..."
            rows="6"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // disable while submitting
          className={`w-full py-2 px-4 rounded-lg text-white cursor-pointer ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
