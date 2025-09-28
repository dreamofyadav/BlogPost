import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        About Our Blog
      </h1>

      <p className="text-gray-700 text-lg mb-4">
        Welcome to our blog! Here, we share insightful articles on a variety of topics including technology, lifestyle, travel, food, education, and more. Our goal is to provide valuable content that inspires, educates, and entertains our readers.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        Our team of passionate writers and content creators strive to bring you unique perspectives, tips, and in-depth analysis. Whether you are here to learn something new or just to enjoy reading, we have something for everyone.
      </p>

      <p className="text-gray-700 text-lg mb-4">
        We encourage interaction and community. Feel free to comment on our posts, share your thoughts, and join the discussion. Together, we can make this a platform where knowledge and creativity thrive.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-700 text-lg">
        Have questions or suggestions? Reach out to us at{" "}
        <a href="mailto:ay489420@gmail.com" className="text-blue-600 underline">
          ay489420@gmail.com
        </a>{" "}
        or follow us on our social media platforms.
      </p>
    </div>
  );
}
