"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { calculateReadTime } from "@/app/lib/calcReadTime";

// export default function Blogs() {
//   const [blogs,setBlogs] = useState([])
//   useEffect(() => {

//     const getMovies = async () => {
//         try {
//           const data = await getDocs(collection(db, "blogs"));
//           const filteredBlogs = data.docs.map((movie) => ({
//             ...movie.data(),
//             id: movie.id,
//           }));
//           setBlogs(filteredBlogs);

//         } catch (error) {
//           console.log(error);
//         }
//     }
//     getMovies();
//     console.log(blogs);
//   }, []);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       console.log("User ID:", user.uid);
//       console.log("User email:", user.email);
//       console.log("Display name:", user.displayName);
//     } else {
//       console.log("No user is logged in.");
//     }
//   }, []);

//   useEffect(()=>{setBlogs(blogs)},[blogs])

//   return (
//     <>
//       <h2>hhshs</h2>
//       <button onClick={logout}>logout</button>
//       {/* <div className="flex p-4 flex-wrap bg-red-300">
//         {blogs.map(blog => {
//           const { blogContent, blogTitle, category, id, img } = blog
//           return (
//             <div key={id}>
//               <Image src={img} alt="judud" />
//               <h1>{blogTitle }</h1>
//             </div>
//           )
//         })}
//       </div> */}
//     </>
//   );
// }

// Blogs.js

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUserID, setLoggedUserID] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Blogs</h1>
      <div className="flex flex-wrap gap-5">
        {console.log(blogs)}
        <>
        {blogs.map((blog) => (
          <div key={blog.id}>
            {blog.id} - {blog.blogTitle} -{blog.category}
            <p>
              {" "}
              BlodID: {blog.publisherID} loggedUserID: {loggedUserID}{" "}
              <Image alt="bloImg" src={blog.img} width={400} height={400}/>
            </p>
            <h2>Read time: { calculateReadTime(blog.blogTitle)}</h2>
          </div>
        ))}
        </>
      </div>
    </div>
  );
};

export default Blogs;
