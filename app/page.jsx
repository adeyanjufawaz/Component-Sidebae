"use client";
import Image from "next/image";
import childrenImg from "../public/children.png";
import mainMan from "../public/mainMan.png";
import img1 from "../public/staff1.png"
import img2 from "../public/staff2.png"
import img3 from "../public/staff3.png"
import { delay, motion } from "framer-motion";

export default function Home() {
    

  return (
    <>
      {/* Home */}
      <section className="w-full homes text-white flex justify-center items-center ">
        <div className="lg:w-1/2 w-3/4">
          <h1 className="customized_h1">
            Welcome to Chatter: A Haven for Text-Based Content
          </h1>
          <h2 className="customized_h2 my-8">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </h2>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-2 md:p-4 lg:p-6">
        {/* About Chatter */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.3fr,1fr]">
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="p-8 flex flex-col justify-center items-start "
          >
            <h1 className="customized_header">About Chatter</h1>
            <p className="customized_p">
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-96 lg:p-8 p-4"
          >
            <Image src={childrenImg} alt="Children" width={500} height={300} />
          </motion.div>
        </div>
      </section>

      {/* Why you should join chatter */}
      <section className="lg:mt-8 mt-2 flex flex-col justify-center items-center pb-14 ">
        <motion.h2
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className="customized_header text-center "
        >
          Why you should join chatter
        </motion.h2>
        <motion.p
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className="customized_p w-3/4 "
        >
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </motion.p>
        <div className="grid grid-cols-1 items-center lg:grid-cols-3 w-[70%] justify-center mt-16 gap-10">
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-[250px] md:min-h-[120px] flex flex-col gap-4 p-5 border-[grey] border rounded-[7px]"
          >
            <h2 className="customized_h1">Analytics</h2>
            <p className="">
              Analytics to track the number of views, likes and comment and also
              analyze the performance of your articles over a period of time
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-[250px] md:min-h-[120px] flex flex-col gap-4 p-5 border-[grey] border rounded-[7px]"
          >
            <h2 className="customized_h1">Social Interactions</h2>
            <p>
              Users on the platform can interact with posts they like, comment
              and engage in discussions
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-[250px] md:min-h-[120px] flex flex-col gap-4 p-5 border-[grey] border rounded-[7px]"
          >
            <h2 className="customized_h1">Content creation.</h2>
            <p>
              Write nice and appealing with our in-built markdown, a rich text
              editor
            </p>
          </motion.div>
        </div>
      </section>

      {/* Review Section */}
      <section id="review" className="p-2 md:p-4 bg-[rgba(235,202,208,.7)]">
        <div className="grid gap-16 p-[3rem] lg:py-10 lg:px-20 grid-cols-1 lg:grid-cols-[1fr,2fr]">
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-56 h-w-56 rounded-full"
          >
            <Image
              src={mainMan}
              alt="pivcs of a man"
              className="rounded-full"
            />
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.3 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1>
              `&quot;`Chatter has become an integral part of my online
              experience. As a user of this incredible blogging platform, I have
              discovered a vibrant community of individuals who are passionate
              about sharing their ideas and engaging in thoughtful
              discussions.`&quot;`
            </h1>
            <h2 className="my-12">
              <b>Adebobola Muhydeen</b>, Software developer at Apple
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="grid gap-16 p-[3rem] grid-cols-[.5fr,1] lg:grid-cols-[1fr,3fr] ">
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.3 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="img--box relative mx-auto w-full md:w-1/2  lg:w-full min-h-[300px]"
        >
          <Image
            src={img1}
            alt="pics of a user"
            className="rounded-[50%] absolute top-0 left- w-[7rem] h-[7rem]"
          />
          <Image
            src={img2}
            alt="pics of a user"
            className="rounded-[50%] absolute top-[30%] right-[5%] w-[7rem] h-[7rem]"
          />
          <Image
            src={img3}
            alt="pics of a user"
            className="rounded-[50%] absolute bottom-0 left-0- w-[7rem] h-[7rem]"
          />
        </motion.div>

        {/*  */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.3 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:w-[70%] mx-auto"
        >
          <h1 className="customized_h1 mb-6">
            Write, read and connect with great minds on chatter
          </h1>
          <p className="customized_p">
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals
          </p>
        </motion.div>
      </section>
    </>
  );
}
