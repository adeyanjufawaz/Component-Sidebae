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

        <div className="flex gap-3 ">
          <button className="customized_h3" onClick={goToBlogs}>
            <p>Blogs</p>
          </button>

          {/* SignIn and SignOut buttons */}
          {currentUser ? (
            // If signed in show this
            <div className="relative" onClick={toggle}>
              {userProfile ? (
                // If the user has a profile show profile
                <Image
                  src={userProfile}
                  alt="user profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                // If user does not have a profile show display name
                <button className="bg-pry flex text-white items-center justify-center rounded-full w-[40px] h-[40px]">
                  <h2 className="text-white">{currentUser}</h2>
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                style={isOpen ? { display: "flex" } : { display: "none" }}
                className="absolute customized_btn mt-1 !bg-gray-700 justify-center items-center right-0 p-1"
              >
                logout
              </button>
            </div>
          ) : (
            // If signed out show this
            <button className="border rounded-lg text-white bg-pry px-6">
              <Link onClick={signInWithGooglePopup} href="/login">
                Login
              </Link>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
