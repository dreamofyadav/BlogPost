import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/blogs/${id}`);
        setBlog(res.data.post);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

   // Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // agar login nahi hai to skip

        const res = await axios.get("http://localhost:3001/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`http://localhost:3001/blogs/${id}`, config);
    toast.success("Blog Deleted!");
    // alert("Blog deleted successfully");
    // redirect ya state update
     navigate("/");
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found!</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 shadow-md rounded-md">
      {blog.image && (
        <img
          src={blog.image.url || blog.image}
          alt={blog.title}
          className="w-3/4 max-w-md h-auto mb-5 rounded-md mx-auto"
        />
      )}

      {/* Title and CreatedAt row */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold text-left">Title: {blog.title}</h2>
        <div className="text-right">
            <span className="text-sm text-gray-500">
            CreatedAt- {new Date(blog.createdAt).toLocaleDateString()}
            </span>

            {blog.updatedAt && blog.updatedAt !== blog.createdAt && ( // check karenge agar update hua hai to hi show karenge
            <p className="text-sm text-gray-500">
                UpdatedAt: {new Date(blog.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
          {/* Author */}
      <p className="mt-1 mb-3 text-sm text-gray-500">
        Author: {blog.author?.name}
      </p>
      {/* Description below title */}
      <p className="text-gray-600 text-base mb-4">Description :- {blog.description}</p>

      {/* Content */}
      <p className="text-gray-700 text-lg">{blog.content}</p>

      
      {/* Buttons */}
      {currentUser && blog.author?._id === currentUser._id && (
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
      )}
    </div>
  );
}
