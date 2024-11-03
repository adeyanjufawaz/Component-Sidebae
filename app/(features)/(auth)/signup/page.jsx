"use client";
import React, { useEffect, useState } from "react";
import { auth, storage } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";



export default function Page() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [profile, setProfile] = useState("");

  const [errOcc, setErrOcc] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();
  // const signup = async (e, email, password, displayName, photoURL) => {
  //   e.preventDefault();
  //   console.log(email,password,displayName,photoURL)
  //   const auth = getAuth();

  //   try {
  //     // Create a new user
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     // Update the user's profile with display name and photo URL
  //     await updateProfile(user, {
  //       displayName: displayName,
  //       photoURL: photoURL,
  //     });
  //     router.push("/blogs");
  //     setErrOcc(false);
  //     console.log(
  //       "User created with display name and profile picture:",
  //       displayName,
  //       photoURL
  //     );
  //   } catch (error) {
  //     const errorCode = error.code;
  //     setErrMsg(errorCode);
  //     console.error("Error creating user:", error);
  //   }
  // };

  const signup = async (e, mail, pwd, dpName,image) => {
    e.preventDefault()
    console.log(mail, pwd, dpName, image);
    
    const userCredential = await createUserWithEmailAndPassword(
         auth,
         email,
         password
       );
    const user = userCredential.user;
    console.log(userCredential)

    // Update the user's profile with display name and photo URL
    if (user) {
      try {
        await updateProfile(user, {
          displayName: dpName,
        });
        console.log("Display name updated to:", dpName);
      } catch (error) {
        console.error("Error updating display name:", error);
      }
    } else {
      console.error("No user is currently signed in.");
    }
       
  };
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="absolute bg-red-400 p-3 top-[13%] right-0">{errMsg}</div>
      <form className="flex gap-6 flex-col mt-5 border-pry border-double border-2 p-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-full text-sm text-red-300 border "
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setUserName(e.target.value)}
          className="p-3 rounded-full text-sm text-red-300 border "
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-full text-sm text-red-300 border "
          type="password"
          placeholder="Password"
        />

        <input
          onChange={(e) => setProfile(e.target.files[0])}
          className="p-3 rounded-full text-sm cursor-pointer text-red-300 border "
          type="file"
          placeholder="Upload picture"
        />

        <button
          onClick={(e) => signup(e, email, password, username, profile)}
          className="customized_btn"
        >
          sign up
        </button>
      </form>
    </div>
  );
}
