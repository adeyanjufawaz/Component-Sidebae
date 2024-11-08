"use client";
import { useState } from "react";
import "./navbar.css";
import { auth } from "@/config/firebase";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";

import { googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function Navbar() {
  const router = useRouter();

  const { user, setUser } = useAuth();
  const [loggedUser, setLoggedUser] = useState("");

  const [logoutBtn, setLogoutBtn] = useState(false);
  const togglelogoutBtn = () => setLogoutBtn((prev) => !prev);

  useEffect(() => {
    setLoggedUser(user.uid);
  }, [user, loggedUser]);

  const signInWithGooglePopup = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({ ...result.user });
      router.push("/blogs");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
    }
  };

  const goToBlogs = (e) => {
    signInWithGooglePopup(e);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser({});
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full z-10 fixed top-0  ">
      {/* Desktop Nav */}
      <nav className="z-20 h-[70px] polaroid flex justify-between lg:gap-6 md:gap-14  py-4 px-4 md:px-10 drop-shadow-2xl ">
        <div className="flex items-center justify-center gap-5 item">
          <div>
            <h2 className="self-start font-semibold text-pry md:text-[1.5rem] uppercase ">
              <Link href="/">CHatter</Link>
            </h2>
          </div>

          <button
            className="flex justify-center items-center py-4 px-4 md:px-7 text-white cursor-pointer bg-purple-600 max-h-9 rounded hover:bg-pry"
            onClick={goToBlogs}
          >
            Blogs
          </button>
        </div>

        {/* lOGIN IN BUTTON */}
        {loggedUser ? (
          <div
            onClick={togglelogoutBtn}
            className="bg-black cursor-pointer h-10 w-10 relative rounded-full"
          >
            <Image
              src={user.photoURL}
              width={100}
              height={100}
              alt={"user.displayName"}
              className="h-full w-full rounded-full"
            />
            {logoutBtn ? (
              <>
                <button
                  onClick={logout}
                  className="bg-gray-700 z-[9999] flex justify-center items-center h-10 w-28 p-4 absolute right-0 mt-2 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          <Link
            href={"/login"}
            className="flex justify-center items-center py-4 px-4 md:px-7 rounded-full text-white cursor-pointer hover:bg-purple-500 bg-pry"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}
