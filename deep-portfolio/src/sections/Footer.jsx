import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

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
      "drop-shadow(0 0 10px rgba(250,204,21,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.4))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },

  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* 🔥 Same Background Glow as Skills */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full 
                     bg-gradient-to-r from-black via-gray-700 to-yellow-400
                     opacity-20 blur-[120px] animate-pulse"
        />
        <div
          className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full 
                     bg-gradient-to-r from-yellow-400 via-gray-600 to-black
                     opacity-20 blur-[120px] animate-pulse delay-500"
        />
      </div>

      {/* Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        {/* Name Heading */}
        <h1
          className="font-bangers font-semibold leading-none text-center select-none
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-yellow-400 via-white to-gray-400"
          style={{
            fontSize: "clamp(3rem, 5vw, 10rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            textShadow: "0 2px 18px rgba(0,0,0,0.5)",
          }}
        >
          Deep Chand
        </h1>

        {/* Divider */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-yellow-400 via-white to-gray-400" />

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl md:text-3xl text-yellow-400">
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

        {/* Quote */}
        <p className="text-gray-300 italic max-w-xl">
          “I believe success is the result of preparation meeting opportunity.”
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Deep Chand. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
