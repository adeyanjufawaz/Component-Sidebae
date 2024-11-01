"use client";
import { useState } from "react";
import "./navbar.css";
import { moveToAbout, moveToReview } from "../lib/random";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen((prev) => !prev);
  return (
    <div className="w-full z-10 fixed top-0  ">
      {/* Desktop Nav */}
      <nav className="z-20 h-[70px] polaroid flex justify-between py-4 px-4 md:px-10 drop-shadow-2xl ">
        <h2 className="w-[10%] self-start font-semibold text-pry text-[1.5rem] uppercase ">
          <Link href="/">CHatter</Link>
        </h2>

        <div className="flex gap-3 ">
          <button className="customized_h3">
            <Link href="/blogs">Blogs</Link>
          </button>
          <button className="border rounded-lg text-white bg-pry px-6">
            <Link href="/login">Login</Link>
          </button>
        </div>
      </nav>

      {/* -------------------> */}
      {/* Mobile Nav */}
      {/* <nav className={`lg:hidden h-14 polaroid p-4 fixed top-0 w-full `}>
        <div className="flex justify-between">
          <div>
            <h2 className="self-start font-semibold text-pry text-[1.5rem] uppercase ">
              <Link href="/">CHatter</Link>
            </h2>
          </div>
          <button onClick={toggle}>toggle</button>
        </div>
        <section
          className={`bg-slate-300 w-full h-[90vh] mt-4 ${
            isOpen ? "isOpen " : "isClosed "
          } `}
        >
          <div className="flex flex-col justify-end items-end p-8">
            <button className="customized_h3">
              <Link href="/">Home</Link>
            </button>
            <button className="customized_h3">
              <Link href="/blog">Blogs</Link>
            </button>
          </div>
        </section>
      </nav> */}
    </div>
  );
}
