// import React, { useContext } from 'react'
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { blogData } from '../assets/data'
import BlogCard from './BlogCard';


export default function Home() {
      const [blogs, setBlogs] = useState([]);

       // Fetch blogs from backend
useEffect(() => {       
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://blogpost-q2as.onrender.com/blogs", );
      console.log(res.data);
      setBlogs(res.data.posts); // backend returns array of blog objects
    } catch (err) {
      console.error(err);
    }
  };

   fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className='text-3xl my-3 text-gray-700 font-bold text-center sm:text-start ml-10 mt-1 mb-2'>Blogs</h1>
      {/* <div className="container mx-auto px-4 lg:px-0"> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-4'>
        {blogs.map((blog) =>(
          <BlogCard key={blog._id} id={blog._id} title={blog.title} image={blog.image}
          description={blog.description}
          category={blog.category} author_name={blog.author_name}  
          date={new Date(blog.createdAt).toLocaleDateString()}
          />
        ))}
        {/* </div>    */}
        </div> 
    </div>
  );
};
