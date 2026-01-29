import React from "react";
import { motion } from "framer-motion";
import m1 from "../assets/m1.jpg";

const MH2 = motion.h2;
const MDiv = motion.div;

const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Deep is an exceptional developer with a sharp eye for detail. His creativity and technical expertise played a key role in making our project a huge success.",
    image: m1,
  },
   {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Deep is an exceptional developer with a sharp eye for detail. His creativity and technical expertise played a key role in making our project a huge success.",
    image: m1,
  }, {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Deep is an exceptional developer with a sharp eye for detail. His creativity and technical expertise played a key role in making our project a huge success.",
    image: m1,
  }, {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Deep is an exceptional developer with a sharp eye for detail. His creativity and technical expertise played a key role in making our project a huge success.",
    image: m1,
  },
  
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white
      flex flex-col items-center justify-center px-4 py-10"
    >
      {/* Heading */}
      <MH2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-semibold mb-10
        bg-clip-text text-transparent
        bg-gradient-to-r from-yellow-400 via-white to-gray-400"
      >
        What People Say
      </MH2>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8
        max-w-5xl w-full"
      >
        {testimonials.map((testi, idx) => (
          <MDiv
            key={testi.name + idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            className="
            relative h-[260px]
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl p-6
            shadow-[0_0_30px_rgba(250,204,21,0.15)]
            hover:shadow-[0_0_45px_rgba(250,204,21,0.35)]
            transition-all duration-300
            flex flex-col items-center text-center"
          >
            {/* Accent Line */}
            <div
              className="absolute left-0 top-0 h-full w-1
              rounded-l-2xl
              bg-gradient-to-b from-yellow-400 to-orange-400"
            />

            {/* Avatar */}
            <img
              src={testi.image}
              alt={testi.name}
              loading="lazy"
              className="w-16 h-16 rounded-full
              border-2 border-white/40
              object-cover mb-4"
            />

            {/* Review */}
            <p className="text-gray-200 italic text-sm leading-relaxed mb-4 line-clamp-4">
              “{testi.review}”
            </p>

            {/* Name */}
            <h3 className="text-lg font-semibold text-white">{testi.name}</h3>

            {/* Role */}
            <p className="text-sm text-gray-400">{testi.role}</p>
          </MDiv>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
