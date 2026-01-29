// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const experiences = [
//   {
//     role: "Virtual Web Development Intern",
//     company: "Snapdeal | Aimerz.ai",
//     duration: "2025",
//     description:
//       "Built a full-stack E-Commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js)",
//   },

//   {
//     role: "Web Developer Intern",
//     company: "Mobisoft Technologies",
//     duration: "2023",
//     description:
//       "In this internship , I gained valuable hands on experience and exposure to various aspects of web development.",
//   },
//   {
//     role: "Graduate Engineer",
//     company: "HCL Technologies",
//     duration: "2024",
//     description:
//       "Built the frontend of a GenAI-powered PV Intake Application using Next.js and TypeScript for a U.S life sciences.",
//   },

// ];

// function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
//   const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
//   const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
//   const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

//   const isAbove = idx % 2 === 0;

//   const cardY = useTransform(
//     scrollYProgress,
//     [start, end],
//     [isAbove ? 30 : -30, 0],
//   );

//   const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

//   if (layout === "desktop") {
//     return (
//       <div
//         className="relative flex-1 flex justify-center items-center min-w-0"
//         key={`${exp.company}-${exp.role}-${idx}`}
//       >
//         {/* Marker */}
//         <motion.div
//           className="z-10 w-7 h-7 rounded-full bg-yellow-400
//           shadow-[0_0_0_8px_rgba(250,204,21,0.15)]"
//           style={{ scale: markerScale, opacity: markerOpacity }}
//         />

//         {/* Connector Line */}
//         <motion.div
//           className={`absolute ${
//             isAbove ? "-top-8" : "-bottom-8"
//           } w-[3px] bg-gray-500/40`}
//           style={{ height: 40, opacity: cardOpacity }}
//         />

//         {/* Card */}
//         <motion.article
//           className={`absolute ${
//             isAbove ? "bottom-12" : "top-12"
//           } bg-gray-900/90 backdrop-blur
//           border border-gray-700 rounded-xl
//           p-7 w-[320px] shadow-lg`}
//           style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
//           transition={{ duration: 0.4, delay: idx * 0.15 }}
//         >
//           <h3 className="text-xl font-semibold text-yellow-300">{exp.role}</h3>

//           <p className="text-md text-gray-400 mb-3">
//             {exp.company} | {exp.duration}
//           </p>

//           <p className="text-md text-gray-200 break-words">{exp.description}</p>
//         </motion.article>
//       </div>
//     );
//   }

//   return (
//     <div
//       key={`${exp.company}-${exp.role}-m-${idx}`}
//       className="relative flex items-start"
//     >
//       {/* Marker */}
//       <motion.div
//         className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full
//         bg-yellow-400 shadow-[0_0_0_8px_rgba(250,204,21,0.15)]"
//         style={{ scale: markerScale, opacity: markerOpacity }}
//       />

//       {/* Mobile Card */}
//       <motion.article
//         className="bg-gray-900/90 backdrop-blur
//         border border-gray-700 rounded-xl
//         p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
//         style={{ opacity: cardOpacity, x: cardX }}
//         transition={{ duration: 0.4, delay: idx * 0.15 }}
//       >
//         <h3 className="text-lg font-semibold text-yellow-300 break-words">
//           {exp.role}
//         </h3>

//         <p className="text-sm text-gray-400 mb-2 break-words">
//           {exp.company} | {exp.duration}
//         </p>

//         <p className="text-sm text-gray-200 break-words">{exp.description}</p>
//       </motion.article>
//     </div>
//   );
// }

// const Experience = () => {
//   const sceneRef = React.useRef(null);
//   const [isMobile, setIsMobile] = React.useState(false);

//   React.useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const SCENE_HEIGHT_VH = isMobile
//     ? 100 * experiences.length * 1.6
//     : 100 * experiences.length * 1.2;

//   const { scrollYProgress } = useScroll({
//     target: sceneRef,
//     offset: ["start start", "end end"],
//   });

//   const numExperiences = experiences.length;

//   const thresholds = React.useMemo(
//     () =>
//       Array.from(
//         { length: numExperiences },
//         (_, i) => (i + 1) / numExperiences,
//       ),
//     [numExperiences],
//   );

//   const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
//   const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

//   return (
//     <section id="experience" className="relative bg-black text-white">
//       <div
//         ref={sceneRef}
//         style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
//         className="relative"
//       >
//         <div className="sticky top-0 h-screen flex flex-col">
//           {/* Heading */}
//           <div className="shrink-0 px-4 pt-6 flex flex-col items-center justify-center">
//             <h2
//               className="
//             text-4xl sm:text-5xl font-semibold mt-5
//             bg-clip-text text-transparent
//             bg-gradient-to-r from-yellow-400 via-white to-gray-400"
//             >
//               Experience
//             </h2>
//           </div>

//           <div className="flex-1 flex items-center justify-center px-6 pb-10">
//             {/* Desktop Timeline */}
//             <div className="relative w-full max-w-7xl hidden md:block">
//               <div className="relative h-[6px] bg-gray-700/40 rounded">
//                 <motion.div
//                   className="absolute left-0 top-0 h-[6px] bg-yellow-400 rounded origin-left"
//                   style={{ width: lineWidth }}
//                 />
//               </div>

//               <div className="relative flex justify-between mt-0">
//                 {experiences.map((exp, idx) => {
//                   const start = idx === 0 ? 0 : thresholds[idx - 1];
//                   const end = thresholds[idx];

//                   return (
//                     <ExperienceItem
//                       key={`${exp.company}-${exp.role}-${idx}`}
//                       exp={exp}
//                       idx={idx}
//                       start={start}
//                       end={end}
//                       scrollYProgress={scrollYProgress}
//                       layout="desktop"
//                     />
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Mobile Timeline */}
//             <div className="relative w-full max-w-md md:hidden">
//               <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gray-700/40 rounded">
//                 <motion.div
//                   className="absolute top-0 left-0 w-[6px] bg-yellow-400 rounded origin-top"
//                   style={{ height: lineHeight }}
//                 />
//               </div>

//               <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
//                 {experiences.map((exp, idx) => {
//                   const start = idx === 0 ? 0 : thresholds[idx - 1];
//                   const end = thresholds[idx];

//                   return (
//                     <ExperienceItem
//                       key={`${exp.company}-${exp.role}-m-${idx}`}
//                       exp={exp}
//                       idx={idx}
//                       start={start}
//                       end={end}
//                       scrollYProgress={scrollYProgress}
//                       layout="mobile"
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Experience;

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Virtual Web Development Intern",
    company: "Snapdeal | Aimerz.ai",
    duration: "2025",
    description:
      "Built a full-stack E-Commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js)",
  },
  {
    role: "Virtual Web Development Intern",
    company: "Snapdeal | Aimerz.ai",
    duration: "2025",
    description:
      "Built a full-stack E-Commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js)",
  },
  {
    role: "Virtual Web Development Intern",
    company: "Snapdeal | Aimerz.ai",
    duration: "2025",
    description:
      "Built a full-stack E-Commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js)",
  },
  {
    role: "Virtual Web Development Intern",
    company: "Snapdeal | Aimerz.ai",
    duration: "2025",
    description:
      "Built a full-stack E-Commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js)",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;

  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );

  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // ================= DESKTOP =================
  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0">
        {/* Marker */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-yellow-400
          shadow-[0_0_0_8px_rgba(250,204,21,0.15)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />

        {/* Connector */}
        <motion.div
          className={`absolute ${
            isAbove ? "-top-8" : "-bottom-8"
          } w-[3px] bg-gray-500/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />

        {/* Card */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"}
          relative w-[320px] rounded-2xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          p-7
          shadow-[0_0_30px_rgba(250,204,21,0.15)]
          hover:shadow-[0_0_45px_rgba(250,204,21,0.35)]
          transition-shadow duration-300`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          whileHover={{ scale: 1.04, y: isAbove ? -6 : 6 }}
        >
          {/* Accent Line */}
          <div
            className="absolute left-0 top-0 h-full w-1 rounded-l-2xl
            bg-gradient-to-b from-yellow-400 to-orange-400"
          />

          <h3 className="text-xl font-semibold text-yellow-300">{exp.role}</h3>

          <p className="text-sm text-gray-400 mb-3">
            {exp.company} • {exp.duration}
          </p>

          <p className="text-sm text-gray-200 leading-relaxed break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  // ================= MOBILE =================
  return (
    <div className="relative flex items-start">
      {/* Marker */}
      <motion.div
        className="absolute -left-[14px] top-4 z-10 w-7 h-7 rounded-full
        bg-yellow-400 shadow-[0_0_0_8px_rgba(250,204,21,0.15)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />

      {/* Mobile Card */}
      <motion.article
        className="relative ml-6 w-[90vw] max-w-sm
        rounded-2xl bg-white/5 backdrop-blur-xl
        border border-white/10 p-5
        shadow-[0_0_25px_rgba(250,204,21,0.15)]"
        style={{ opacity: cardOpacity, x: cardX }}
        whileHover={{ scale: 1.03 }}
      >
        {/* Accent Line */}
        <div
          className="absolute left-0 top-0 h-full w-1 rounded-l-2xl
          bg-gradient-to-b from-yellow-400 to-orange-400"
        />

        <h3 className="text-lg font-semibold text-yellow-300 break-words">
          {exp.role}
        </h3>

        <p className="text-xs text-gray-400 mb-2 break-words">
          {exp.company} • {exp.duration}
        </p>

        <p className="text-sm text-gray-200 leading-relaxed break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length * 1.6
    : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: experiences.length },
        (_, i) => (i + 1) / experiences.length,
      ),
    [],
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Heading */}
          <div className="shrink-0 px-4 pt-6 flex justify-center">
            <h2
              className="text-4xl sm:text-5xl font-semibold mt-5
              bg-clip-text text-transparent
              bg-gradient-to-r from-yellow-400 via-white to-gray-400"
            >
              Experience
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop */}
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[6px] bg-gray-700/40 rounded">
                <motion.div
                  className="absolute left-0 top-0 h-[6px] bg-yellow-400 rounded origin-left"
                  style={{ width: lineWidth }}
                />
              </div>

              <div className="relative flex justify-between">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];

                  return (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile */}
            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gray-700/40 rounded">
                <motion.div
                  className="absolute top-0 left-0 w-[6px] bg-yellow-400 rounded origin-top"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];

                  return (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
