import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.png";
import img11 from "../assets/img11.png";
import img2 from "../assets/img2.png";
import img22 from "../assets/img22.png";

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
        bgColor: "#0a0a0a", // black
        image: isMobile ? img11 : img1,
      },
      {
        title: "Shopping App",
        link: "https://shopping-app-1-v6hr.onrender.com",
        bgColor: "#1f1f1f", // dark gray
        image: isMobile ? img22 : img2,
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
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white bg-black"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black">
        <h2
          className={`text-4xl mt-6 sm:mt-5 text-center sm:text-5xl font-bold 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-yellow-400 via-white to-gray-400 z-10 
                   `}
        >
          My Work
        </h2>

        <div
          className={`lg:relative w-full flex-1 flex items-center justify-center  
         mt-4 sm:mt-16 
          `}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 
                ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center sm:text-left text-[clamp(1.5rem,4vw,3.2rem)]
                     bg-clip-text  text-transparent bg-gradient-to-r from-yellow-400 via-white to-gray-400 sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%]
                      font-bangers italic font-semibold static mt-2 mb-4`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full flex items-center justify-center overflow-hidden bg-black shadow-2xl ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } h-[52vh] sm:h-[66vh]`}
                style={{ zIndex: 10 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 45%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div 
        className={`lg:absolute ${isMobile ? "mb-6" : "bottom-2"} z-50 pointer-events-auto`}
        
        >
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg
              bg-yellow-400 text-black hover:bg-gray-300 transition-all"
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
