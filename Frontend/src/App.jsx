import React from 'react' 
import { useState } from 'react';
import Navbar from "../src/common/Navbar";
import Home from "../src/common/Home";
import Footer from "../src/common/Footer";
import { Route, Routes, useLocation } from 'react-router-dom';
import AddBlog from './View/AddBlog';
import About from './View/About';
import Login from './View/login';
import Signup from './View/signup';
import SinglePost from './View/SinglePost';
import EditBlog from './View/EditBlog';
import ProtectedRoute from './View/ProtectRoute';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const location = useLocation();
  const hideNav_foot=["/signup", "/login"].includes(
    location.pathname
  );
  const hide_foot=[ "/AddBlog"].includes(
    location.pathname
  );
  return (
    <div>
        {!hideNav_foot && <Navbar /> }
        <ToastContainer position="top-right" autoClose={3000}  closeOnClick  theme="colored" />
        <div className='max-w-7xl mx-auto'>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/addblog" element={
            <ProtectedRoute>
               <AddBlog/>
            </ProtectedRoute>
           }/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="/blog/:id" element={<SinglePost />}/>
          <Route path="/edit/:id" element={<EditBlog/>} />
        </Routes>
        {!hideNav_foot && !hide_foot && <Footer/>}
        </div>
    </div>
  )
}
