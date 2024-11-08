"use client";
import { auth, db, storage } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { formmatedDate } from "../../../lib/dateFormatter";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function About() {
  const [publisher, setPublisher] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("Tech & Science");
  const [publisherid, setPublisherID] = useState("");
  const [blogData, setBlogData] = useState({
    datePublished: formmatedDate(),
    category: category,
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogData({ ...blogData, [name]: value });
  };
  const router = useRouter();



  const addBlog = async (e) => {
    const user = auth.currentUser;

    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        ...blogData, author:user.displayName,publisherID:user.uid
      });
      router.push("/blogs");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="  flex justify-center items-center ">
      <div className="mt-12 w-[80%] md:w-[500px] border-4 border-double border-pry p-4">
        <form className="flex flex-col gap-4 w-full" onSubmit={addBlog}>
          <label>Blog title: </label>
          <input
            className="p-3 max-w-60 border-2 border-pry outline-none text-pry"
            name="blogTitle"
            onChange={handleChange}
            type="text"
            required
            placeholder="Blog Title"
          />

          <label>Blog Content: </label>
          <textarea
            id="longText"
            name="blogContent"
            onChange={handleChange}
            className="p-4 border-2 border-pry outline-none text-pry"
            rows="4"
            required
            cols="50"
            placeholder="Enter text here..."
          ></textarea>
          <label htmlFor="category">Choose a category:</label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            className="bg-pry cursor-pointer p-4 text-white"
          >
            <option value="Tech & Science">Tech & Science</option>
            <option value="Sports & entertainment">
              Sports & Entertainment
            </option>
            <option value="Lifestyle & Fashion">Lifestyle & Fashion</option>
            <option value="Food & Health">Food & Health</option>
            <option value="Education">Education</option>
            <option value="Banking & Finance">Banking & Finance</option>
            <option value="Growth & Development">Growth & Development</option>
            <option value="others">others</option>
          </select>


          {!isUploading ? (
            <button className="bg-pry max-w-32 p-3 mt-4 text-white ">
              Add Blog
            </button>
          ) : (
            <button
              disabled
              className="bg-red-400 max-w-32 p-3 mt-4 text-white "
            >
              Uploading .....
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
