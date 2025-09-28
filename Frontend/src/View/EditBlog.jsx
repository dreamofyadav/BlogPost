import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditBlog() {
  const { id } = useParams(); // URL se id milegi
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // Blog data load karna
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/blogs/${id}`);
        if (res.data.success) {
          const blog = res.data.post;
          setForm({
            title: blog.title || "",
            description: blog.description || "",
            content: blog.content || "",
            category: blog.category || "",
            image: null, // naya upload karne ke liye empty rakhenge
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

       const token = localStorage.getItem("token");

      const res = await axios.put(`http://localhost:3001/blogs/${id}`, formData, {
        headers: { 
            "Content-Type": "multipart/form-data", 
            Authorization:`Bearer ${token}`,
        },
      });
      toast.success("Blog Updated Successfully!");
    //   alert("Blog updated successfully!");
      navigate(`/blog/${id}`); // update hone ke baad SinglePost pr redirect
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Failed to Update Blog");
    //   alert("Failed to update blog");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-5">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Short Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          className="border p-2 rounded"
          required
        />
        <label className="font-semibold">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write blog content here..."
          className="border p-2 rounded h-40"
          required
        />
        <label className="font-semibold">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select category</option>
          <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
          
        </select>
        <label className="font-semibold">Image </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
