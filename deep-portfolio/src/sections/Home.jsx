import React, { useEffect, useMemo, useState } from "react";
import ParticleBackground from "../component/ParticlesBackground";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaYoutube, FaInstagram } from "react-icons/fa6";

const socials = [
  {
    Icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@01deepchand",
  },

  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deep-chand-513a69360/?locale=en",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/deep_codding?igsh=cXEzZ2p1aWRpdWQy",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/4getDeepCode",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["Software Developer", "Web Developer", "Content Creator"],
    [],
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // typing effect logic
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 2000);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    ); // original typing speed
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);
  return (
    <section className="w-full h-screen relative overflow-hidden bg-black">
      <ParticleBackground />

      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 
      w-[70vw] sm:w-[50vw] md:w-[40vw] 
      h-[70vw] sm:h-[50vw] md:h-[40vw]
      max-w-[500px] max-h-[500px]
      rounded-full
      bg-gradient-to-r from-black via-gray-700 to-yellow-400
      opacity-30 sm:opacity-20 md:opacity-10 
      blur-[100px] sm:blur-[130px] md:blur-[150px]
      animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 
      w-[70vw] sm:w-[50vw] md:w-[40vw] 
      h-[70vw] sm:h-[50vw] md:h-[40vw] 
      max-w-[500px] max-h-[500px] 
      rounded-full 
      bg-gradient-to-r from-yellow-400 via-gray-600 to-black
      opacity-40 sm:opacity-30 
      blur-[100px] sm:blur-[130px] md:blur-[150px] 
      animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative mt-10 pl-10"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* typing text */}
            <motion.div className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-wide min-h-[1.6em]">
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-yellow-400 animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* name */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-yellow-400 via-white to-gray-400 drop-shadow-lg"
            >
              Hello, I&apos;m
              <br />
              <span className=" 
              bg-clip-text  text-transparent bg-gradient-to-r from-yellow-400 
              font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap">
                Deep Chand
              </span>
            </motion.h1>

            {/* description */}
            <motion.p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              I turn complex ideas into seamless, high-impact web experiences —
              building modern, scalable, and lightning-fast applications that
              make a difference.
            </motion.p>

            {/* buttons */}
            <motion.div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-black 
            bg-yellow-400 shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/Resume.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white 
            hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            <div className="flex gap-5 mt-6  text-2xl md:text-3xl justify-center lg:justify-start text-yellow-400">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-yellow-400 hover:text-white transition-colors duration-200"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* right */}
        <motion.div className="relative hidden lg:flex items-center justify-end">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "8px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #facc15, #ffffff, #6b7280, #facc15)",
            }}
          />
          <motion.img
            src={avatar}
            alt="avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
