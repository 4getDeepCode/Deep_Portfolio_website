import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.png";
import img11 from "../assets/img11.png";
import img2 from "../assets/img2.png";
import img22 from "../assets/img22.png";
import img33 from "../assets/image.png";
import img3 from "../assets/image.png";
import img44 from "../assets/DeepLMS.png";
import img4 from "../assets/DeepLMS.png";

const MH3 = motion.h3;

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) ||
      mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();

  const projects = React.useMemo(
    () => [
      {
        title: "Deep MarketPlace",
        link: "https://deep-marketplace-frontend.onrender.com",
        image: isMobile ? img11 : img1,
        desc: "A full-stack e-commerce platform with product listings, cart, and secure checkout.",
        tech: "React, Node.js, MongoDB",
      },
      {
        title: "Shopping App",
        link: "https://shopping-app-1-v6hr.onrender.com",
        image: isMobile ? img22 : img2,
        desc: "Responsive shopping app with authentication, product filtering, and user-friendly UI.",
        tech: "React, Firebase, Tailwind",
      },
      {
        title: "DeepSkill",
        link: "https://deep-skill-mentorship-driven-platfo-ashy.vercel.app/",
        image: isMobile ? img33 : img3,
        desc: "Mentorship-driven learning platform connecting learners with industry experts.",
        tech: "MERN Stack",
      },
      {
        title: "DeepLMS",
        link: "https://deep-lms-self.vercel.app/",
        image: isMobile ? img44 : img4,
        desc: "Learning Management System with dashboards, course tracking, and analytics.",
        tech: "React, Express, MongoDB",
      },
    ],
    [isMobile],
  );

  const sceneRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  return (
    <section id="projects" className="relative text-white bg-black py-4">
      <div className="flex flex-col items-center justify-start">
        <h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-yellow-400 via-white to-gray-400 
            text-center mb-6"
        >
          My Work
        </h2>

        <p className="text-gray-300 text-center mb-8 text-base sm:text-lg">
          Showcasing real-world projects built with modern technologies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-[#111] rounded-xl overflow-hidden shadow-lg 
               hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[250px] object-cover"
              />

              {/* Content */}

              <div className="p-5 flex justify-between items-start gap-4">
                {/* LEFT SIDE (Tech + Description) */}
                <div className="text-left flex-1">
                  <p className="text-xs text-yellow-400 mb-2">{project.tech}</p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* RIGHT SIDE (Title + Button) */}
                <div className="text-right flex flex-col items-end gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-400 text-black rounded-md 
                             font-medium hover:bg-gray-300 transition text-sm"
                  >
                    View Project
                  </a>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
