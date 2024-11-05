"use client";
import { useState } from "react";
import "./navbar.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "../(features)/(auth)/lib/logout";

import { googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedUser, setloggedUser] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const toggle = () => setIsopen(!isOpen);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser) {
        setloggedUser(currentUser);
        setCurrentUser(
          currentUser.displayName ? currentUser.email.slice(0, 1) : "--"
        );
        setUserProfile(currentUser.photoURL ? currentUser.photoURL : "");
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const signInWithGooglePopup = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      router.push("/blogs");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
    }
  };

  const goToBlogs = (e) => {
    signInWithGooglePopup(e);
  };

  return (
    <div className="w-full z-10 fixed top-0  ">
      {/* Desktop Nav */}
      <nav className="z-20 h-[70px] polaroid flex justify-between py-4 px-4 md:px-10 drop-shadow-2xl ">
        <h2 className="w-[10%] self-start font-semibold text-pry text-[1.5rem] uppercase ">
          <Link href="/">CHatter</Link>
        </h2>

        <button
          className="bg-pry hover:bg-purple-600 p-5 text-lg text-white flex justify-center items-center"
          onClick={goToBlogs}
        >
          <p>Add blog</p>
        </button>
      </nav>
    </div>
  );
}
