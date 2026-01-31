import { FaReact, FaCss3, FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiMysql,
  SiExpress,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiMongodb,
  SiAngular,
} from "react-icons/si";

import { DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const skills = [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <IoLogoJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiAngular />, name: "Angular" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiMysql />, name: "MySQL" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  // detect section visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // detect scroll direction
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // infinite scroll animation (pauses on hover)
  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused) {
        let next = x.get() + SPEED * dir * dt;
        const loop = trackRef.current?.scrollWidth / 2 || 0;

        if (loop) {
          if (next <= -loop) next += loop;
          if (next >= 0) next -= loop;
        }

        x.set(next);
      }

      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, paused, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* heading */}
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-yellow-400 via-white to-gray-400 z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-8 text-gray-300 text-center text-base sm:text-lg z-10 "
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Building Modern Applications with Modern Technologies
      </motion.p>

      {/* skills track */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-4 text-6xl text-yellow-400"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[120px] cursor-pointer"
              aria-label={s.name}
              title={s.name}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm text-gray-300">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
