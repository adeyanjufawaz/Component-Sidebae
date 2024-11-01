"use client";
import { useRef, useState } from "react";
import "./sidebar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {name: "Home",link: "/",},
    {name: "About",link: "/about"},
    {name: "Login",link: "/login"},
  ];

export default function Sidebar() {
  const [isShortNav, setIsShortNav] = useState(true);
  const sideBarRef = useRef(null);
  const toggleSideNav = () => setIsShortNav(!isShortNav);

  const pathname = usePathname()


  

  return (
    <>
      <div
        className={`sidebar ${
          isShortNav ? "active  flex flex-col" : "nonActive flex flex-col"
        }  `}
        ref={sideBarRef}
      >
        
        {navLinks.map(nav => {
          const isActive = pathname.endsWith(nav.link)
          return (
            <Link
              className={
                isActive
                  ? "transition-all delay-[350] bg-red-900 p-4"
                  : "transition-all delay-[350] bg-indigo-900 p-4"
              }
              href={nav.link}
              key={nav.name}
            >
              {nav.name}
            </Link>
          );
        })}
        <button className="bg-blue-400 p-4" onClick={toggleSideNav}>
          click me
        </button>
      </div>
    </>
  );
}
