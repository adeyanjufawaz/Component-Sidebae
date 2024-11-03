"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";
import loginSvg from "../../../../public/loginsvg.png";
import Image from "next/image";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const popRef = useRef(null);
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Request states
  const [isSuccessful, setIsSuccesful] = useState(true);
  const [popMessage, SetPopMessage] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Login Function
  // const login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setIsSuccesful(true);
  //     SetPopMessage("Login successful");
  //     router.push("/blogs");
  //     displayNotification();
  //   } catch (error) {
  //     const errorCode = error.code;
  //     setIsSuccesful(false);
  //     SetPopMessage(errorCode);
  //     displayNotification();
  //   }
  // };

  // Signinwith google popup
  const signInWithGooglePopup = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setIsSuccesful(true);
      SetPopMessage("Login successful");
      router.push("/blogs");
      displayNotification();
    } catch (error) {
      const errorCode = error.code;
      setIsSuccesful(false);
      SetPopMessage("Check your internet connection !!!");
      displayNotification();
    }
  };
  const displayNotification = () => {
    popRef.current.style.display = "block";
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex justify-center  h-full items-center relative  ">
        <div
          style={
            isSuccessful
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
          className="hidden bg-pry text-white p-4 absolute right-0 top-0 "
          ref={popRef}
        >
          <h2>{popMessage}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.2fr]">
          <div className="hidden md:block">
            <Image src={loginSvg} alt="loginSvg" />
          </div>

          <div className="flex flex-col gap-3 justify-center items-center">
            <form className="border-4 mt-8 md:mt-0 border-pry border-double w-full md:w-3/4 lg:w-1/2 p-6">
              <div className="flex flex-col gap-2">
                <h2 className="customized_h3">Email:</h2>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-double border-gray-300 rounded-lg text-gray-700 bg-white  "
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex mt-6 flex-col gap-2">
                <h2 className="customized_h3">Password:</h2>
                <div className="w-full border relative border-gray-300 rounded-lg text-gray-700 bg-white  ">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-full p-3"
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={togglePassword}
                    className="h-full absolute w-[15%] text-white top-0 right-0 flex justify-center items-center bg-pry cursor-pointer "
                  >
                    {showPassword ? <FaRegEyeSlash /> : <IoEyeSharp />}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => login(e, email, password)}
                className="customized_btn w-full mt-8"
              >
                sign in
              </button>

              {/*  */}
              <button
                onClick={signInWithGooglePopup}
                className="customized_h3 text-right text-pry underline mt-8"
              >
                <h2 className="flex justify-center items-center gap-1">
                  Login with Email <BiLogoGmail />
                </h2>{" "}
              </button>

              {/*  */}
              <h3 className="customized_h3 text-right text-gray-700 mt-6 underline">
                <Link href="/signup">Dont have an account? Sign up</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
