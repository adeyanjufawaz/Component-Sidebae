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
      <nav className="hidden z-20 h-[70px] polaroid lg:flex items-center justify-between py-4 px-10 drop-shadow-2xl ">
        <div>
          <h2 className="self-start font-semibold text-pry text-[1.5rem] uppercase ">
            <Link href="/">CHatter</Link>
          </h2>
        </div>
        <div className="flex  gap-10 ">
          <button className="customized_h3" onClick={moveToAbout}>
            About us
          </button>
          <button className="customized_h3" onClick={moveToReview}>
            Reviews
          </button>
          <button className="customized_h3">
            <Link href="/blog">Blog</Link>
          </button>
        </div>
        <button className="customized_btn">Login</button>
      </nav>

      {/* -------------------> */}
      {/* Mobile Nav */}
      <nav
        className={`lg:hidden h-14 polaroid p-4 fixed top-0 w-full `}
      >
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
            <button>Home</button>
            <button>Home</button>
            <button>Home</button>
          </div>
        </section>
      </nav>
    </div>
  );
}
