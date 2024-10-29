"use client";
import { db, storage } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function About() {
  const [blogData, setBlogData] = useState({});
  const [blogImg, setBlogImg] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogData({ ...blogData, [name]: value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime();
      const storageRef = ref(storage, `${name + blogImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blogImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setBlogData({ ...blogData, img: downloadURL });
          });
        }
      );
      console.log(blogData);
    };

    blogImg && uploadFile();
  }, [blogImg]);

  // useEffect(() => {
  //   try {
  //     const getMovies = async () => {
  //       const data = await getDocs(collection(db, "books"));
  //       const filteredMovies = data.docs.map((movie) => ({
  //         ...movie.data(),
  //         id: movie.id,
  //       }));
  //       console.log(filteredMovies);
  //     };
  //     getMovies();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  const addBlog = async () => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), blogData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>About Page</h2>
      <div className="flex flex-col gap-4">
        <input
          className="p-4"
          name="blogTitle"
          onChange={handleChange}
          type="text"
          placeholder="Blog Title"
        />
        <input
          className="p-4"
          name="blogContent"
          onChange={handleChange}
          type="text"
          placeholder="Blog Content"
        />
        <input
          className="p-4"
          onChange={(e) => setBlogImg(e.target.files[0])}
          type="file"
          placeholder="Upload file"
        />
      </div>
      <button className="bg-sky-600 py-4 px-12" onClick={addBlog}>
        Add Docs
      </button>
    </div>
  );
}
