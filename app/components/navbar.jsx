"use client";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen((prev) => !prev);
  return (
    <div className="w-full z-10 fixed top-0 ">
      {/* Desktop Nav */}
      <nav className="hidden lg:flex justify-between md:block py-4 px-10 drop-shadow-2xl ">
        <h2 className="self-start font-bold text-[#543EE0] text-[2rem] uppercase ">
          CHatter
        </h2>
        <div className="flex  gap-5 ">
          <button>About</button>
          <button>About</button>
          <button>Blog</button>
              </div>
              <button>Login</button>
      </nav>

      {/* -------------------> */}
      {/* Mobile Nav */}
      <nav className={`md:hidden p-4 bg-green-500  w-full relative`}>
        <div className="flex justify-between">
          <h1>LOGO</h1>
          <button onClick={toggle}>toggle</button>
        </div>
        <section
          className={`bg-slate-300 h-[90vh] mt-8 ${
            isOpen ? "isOpen " : "isClosed "
          } `}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, iusto
          laborum sequi labore assumenda blanditiis sed asperiores neque
          dignissimos harum repellendus quae earum praesentium natus impedit
          culpa suscipit voluptatem dolorem beatae quos repudiandae voluptas!
          Delectus, vitae possimus? Error perspiciatis, ratione repellat atque
          nihil blanditiis nisi ut doloremque consectetur similique a qui.
          Voluptatibus quidem fuga rerum itaque iste maiores esse laborum aut ea
          aperiam nisi, laboriosam ipsa suscipit, hic eligendi? Beatae saepe
          animi dicta, non quis debitis quae iste nesciunt facilis labore eius
          fugiat molestiae natus nulla ratione perspiciatis quia repellat
          pariatur vitae eum. Quam reiciendis ducimus non libero voluptatem vero
          quis dicta esse animi, nostrum sed? Vitae odit itaque accusantium sunt
          natus earum rem debitis similique iusto distinctio, dignissimos
          fugiat, aut doloremque praesentium maxime autem iste aperiam ex
          adipisci! Vel veniam ratione, nulla nostrum aliquam harum itaque
          facilis deleniti dolorem assumenda quo laboriosam amet velit libero
          non qui. Illum eligendi asperiores, et sapiente, deleniti repellat
          iste vitae cum quia voluptates dignissimos atque architecto, qui
          placeat! Labore repellendus accusamus enim ex animi, sit adipisci non
          repellat recusandae possimus nesciunt saepe at vero? Molestias
          expedita, quo corporis neque, praesentium quidem dolore temporibus,
          mollitia illum fugiat delectus numquam. Ad dolor incidunt voluptatem
          voluptatibus.
        </section>
      </nav>
    </div>
  );
}
