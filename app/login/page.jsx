"use client";

import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const signIn = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.status)
    }
  };
  return (
    <div className="flex h-full justify-center items-center">
      <form className="flex gap-4 flex-col">
        <input
          type="email"
          className="p-4 rounded-md text-black"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="p-4 rounded-md text-black"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-indigo-500 w-full p-4" onClick={signIn}>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Page;
