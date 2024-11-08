"use client";

import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { auth, db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { calculateReadTime } from "@/app/lib/calcReadTime";
import Link from "next/link";
import { doc, deleteDoc } from "firebase/firestore";

// Blogs.js

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUserID, setLoggedUserID] = useState("");
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedUserID(currentUser.uid);
      } else {
        console.log("No logged user");
      }
    });
    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [loggedUserID]);

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

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is logged in.");
      router.push("/login");
    }

    // Function to fetch data from Firestore
    getBlogs();
  }, []);

  const deleteBlog = async (blogID) => {
    await deleteDoc(doc(db, "blogs", blogID));
    getBlogs();
  }

  // if (loading) {
  //   return (<h2>Loading ...</h2>)
  // }

  return (
    <div className=" p-3 md:p-7">
      <div className="flex px-2 gap-8 justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="customized_h2">FEED</h1>
          <p className="customized_p">Explore content you&apos;d love</p>
        </div>
        <Link
          href="/blogs/create"
          className="blog_btn  flex justify-center items-center gap-2"
        >
          <MdEdit />
          <p>Create</p>
        </Link>
      </div>

      <div className="min-h-8  mt-10 gap-7 lg:gap-10 flex flex-wrap justify-center ">
        {blogs.map((blog) => {
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
            <div
              key={id}
              className="min-h-[250px] w-40 md:w-56 rounded-md lg:w-72 p-3 shadow-2xl "
            >
              <div>
                <Link href={`/blogs/${id}`}>
                  <p className="mt-4 truncate font-bold uppercase ">
                    {blogTitle}
                  </p>
                  <button className="cursor-auto bg-pry p-2 text-xs lg:text-base font-medium  mt-4 text-white">
                    {category}
                  </button>

                  <div className="flex flex-col mt-4 ">
                    <p className="text-xs lg:text-base ">
                      <b>Author</b>: {author}
                    </p>
                    <p className="text-xs lg:text-base font-semibold">
                      {datePublished}
                    </p>
                  </div>
                  <p>{calculateReadTime(blogContent)} read</p>
                </Link>
              </div>
              {loggedUserID == publisherID && (
                <button
                  onClick={() => deleteBlog(id)}
                  className="mt-4 bg-red-400 text-white py-2 px-5 right-0"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
