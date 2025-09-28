import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogCard({ id, title, description, category, image,
    author_name, author_image, date}
) {
  return (
    <div className='border-1 border-gray-300 shadow-md p-3 rounded-md'>
    <Link to={`/blog/${id}`}>
    <img src={image?.url} alt='imageblog' className='flex items-center justify-center w-full mx-auto cursor-pointer transform duration-300 hover:scale-105'/>
    </Link>
    {/* <p className='text-[#4B6BFB] font-semibold my-3'>{category}</p> */}
    <div className='flex justify-between items-center mt-2'>
    <h1 className='text-xl font-bold mt-2'>{title}</h1>
    <span className='text-sm text-gray-500'>{date}</span>
    </div>
     <p className='text-gray-600 text-sm mt-1'>{description}</p>

    <div className='flex gap-3 items-center'>
        {/* <img src={author_image} alt=''  className='w-10 h-10 rounded-full object-cover mt-1'/> */}
        {/* <p className='text-lg font-bold text-gray-600'>{author_name}</p> */}
        {/* <span className='text-sm font-bold text-gray-500'>{date}</span> */}
    </div>
    </div>
  )
}
