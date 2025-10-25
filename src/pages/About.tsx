import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { loadData } from "@/lib/loadData";
// import Particles from "react-tsparticles"; // Optional: Uncomment if you installed react-tsparticles

type Skill = {
  name: string;
  level?: string;
};

export default function About() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    loadData<Skill>("skills").then((data) => setSkills(data));
  }, []);

  // Staggered skill animation
  const skillVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring" as const, stiffness: 120 },
    }),
    hover: { scale: 1.1, rotate: 3 },
  };

  // Neon pulse keyframes
  const neonPulse = [
    "0 0 5px #06b6d4, 0 0 10px #f472b6, 0 0 15px #facc15",
    "0 0 15px #06b6d4, 0 0 30px #f472b6, 0 0 45px #facc15",
    "0 0 5px #06b6d4, 0 0 10px #f472b6, 0 0 15px #facc15",
  ];

  return (
    <section className="relative min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center overflow-hidden">
      {/* Optional particle background */}
      {/*
      <Particles
        options={{
          background: { color: "#000000" },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
          particles: {
            color: { value: ["#06b6d4", "#f472b6", "#facc15"] },
            links: { enable: true, color: "#555", distance: 120 },
            move: { enable: true, speed: 1 },
            number: { value: 40 },
            opacity: { value: 0.5 },
            size: { value: { min: 2, max: 4 } },
          },
        }}
      />
      */}

      {/* Heading */}
      <motion.h2
        className="relative text-5xl font-semibold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-10 z-10"
        initial={{ opacity: 0, y: 20, textShadow: neonPulse[0] }}
        animate={{
          opacity: 1,
          y: 0,
          textShadow: neonPulse,
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        About Me
      </motion.h2>

      <div className="relative z-10 max-w-5xl flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Profile Image */}
        <motion.img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border border-neutral-700 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.07, rotate: 3 }}
          transition={{ duration: 0.6 }}
        />

        {/* Bio Section */}
        <motion.div
          className="flex-1 text-neutral-300 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg mb-6">
            Hey, I’m <span className="text-cyan-400 font-medium">Ogwusearch</span> — a modern
            software engineer focused on building fast, intuitive, and intelligent systems
            for the web. I love working at the intersection of design, automation, and AI tools
            that empower developers and businesses.
          </p>
          <p className="text-neutral-400 mb-6">
            My work often involves TypeScript, React, Supabase, n8n automation, and emerging
            AI SDKs. I’m passionate about modular architectures, open data standards, and
            creating developer experiences that feel futuristic yet minimal.
          </p>

          {/* Skills */}
          <motion.div className="mt-8" initial="hidden" animate="visible">
            <h3 className="text-xl font-semibold text-white mb-4">Core Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={skillVariants}
                  whileHover="hover"
                  className="px-4 py-2 text-sm rounded-full border border-neutral-700 cursor-pointer transition-colors duration-200"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #f472b6, #facc15)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  animate={{
                    textShadow: [
                      `0 0 ${2 + i}px #06b6d4, 0 0 ${4 + i}px #f472b6, 0 0 ${6 + i}px #facc15`,
                      `0 0 ${6 + i}px #06b6d4, 0 0 ${12 + i}px #f472b6, 0 0 ${18 + i}px #facc15`,
                      `0 0 ${2 + i}px #06b6d4, 0 0 ${4 + i}px #f472b6, 0 0 ${6 + i}px #facc15`,
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                >
                  {skill.name}
                  {skill.level && (
                    <span className="ml-2 text-xs text-neutral-500">({skill.level})</span>
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
