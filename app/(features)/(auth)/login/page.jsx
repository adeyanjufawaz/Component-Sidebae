"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";
import loginSvg from "../../../../public/loginsvg.png";
import Image from "next/image";
// Import for Firebase login
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user, setUser } = useAuth();
  const router = useRouter()

  const signInWithGooglePopup = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({ ...result.user });
      router.push("/blogs");
    } catch (error) {
      const errorCode = error.code;
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex justify-center  h-full items-center relative  ">
        {/* <div
          style={
            isSuccessful
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
          className="hidden bg-pry text-white p-4 absolute right-0 top-0 "
          ref={popRef}
        >
          <h2>{popMessage}</h2>
        </div> */}
        <div className="grid h-[50vh] grid-cols-1 md:grid-cols-2">
          <div className="hidden h-full md:block relative">
            <Image src={loginSvg} alt="loginSvg" width={100} height={100} className="h-full w-full" />
          </div>

          <div className="flex flex-col gap-3 justify-center items-center">
            {/*  */}
            <button
              onClick={signInWithGooglePopup}
              className="customized_h3 text-right p-4 bg-pry hover:bg-purple-700 text-white "
            >
              <h2 className="flex justify-center items-center gap-1">
                Login with Email <BiLogoGmail />
              </h2>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
