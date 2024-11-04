"use client";

import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { auth, db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import img from "../../../public/mainMan.png";
import { onAuthStateChanged } from "firebase/auth";
import { calculateReadTime } from "@/app/lib/calcReadTime";
import Link from "next/link";

// Blogs.js

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUserID, setLoggedUserID] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        console.log(`Logged user : ${currentUser.uid}`);
        setLoggedUserID(currentUser.uid);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [loggedUserID]);

  useEffect(() => {
    // Function to fetch data from Firestore
    const getBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsSnapshot = await getDocs(blogsCollection);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
        // console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <div className=" p-3 md:p-7">
      <div className="flex px-2 gap-8 justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="customized_h2">FEED</h1>
          <p className="customized_p">Explore content you'd love</p>
        </div>
        <Link
          href="/create"
          className="blog_btn  flex justify-center items-center gap-2"
        >
          <MdEdit />
          <p>Create</p>
        </Link>
      </div>
      {/* <div className="flex flex-wrap gap-5">
        {console.log(blogs)}
        <>
          {blogs.map((blog) => (
            <div key={blog.id}>
              {blog.id} - {blog.blogTitle} -{blog.category}
              <p>
                {" "}
                BlogID: {blog.publisherID} loggedUserID: {loggedUserID}{" "}
                <Image alt="bloImg" src={blog.img} width={400} height={400} />
              </p>
              <h2>Read time: {calculateReadTime(blog.blogTitle)}</h2>
            </div>
          ))}
        </>
      </div> */}
      <div className="min-h-8 mt-10 gap-7 lg:gap-10 flex flex-wrap justify-center ">
        {blogs.map((blog) => {
          console.log(blog);
          const {
            author,
            blogContent,
            blogTitle,
            datePublished,
            category,
            id,
            img,
            publisherID,
          } = blog;
          return (
            <>
              <div
                key={id}
                className="w-40 md:w-56 rounded-md lg:w-72 p-3 shadow-2xl "
              >
                {/* Card__Img-section */}

                <div className="h-24 md:h-40 lg:h-60 w-full mt-4 relative rounded-md">
                  <Image
                    src={img}
                    width={100}
                    height={100}
                    className="absolute rounded-md w-full h-full"
                    alt="djjdjd"
                  />
                </div>

                <button className="bg-pry p-2 text-xs lg:text-base font-medium  mt-4 text-white">
                  {category}
                </button>
                <p className="mt-4 truncate ">{blogTitle}</p>

                <div className="flex flex-col mt-4 ">
                  <p className="text-xs lg:text-base ">
                    <b>Author</b>: {author}
                  </p>
                  <p className="text-xs lg:text-base font-semibold">
                    {datePublished}
                  </p>
                </div>
                <p >{ calculateReadTime(blogContent)} read</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
