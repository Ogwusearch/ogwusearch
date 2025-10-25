import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadData } from "@/lib/loadData";

type Project = {
  title: string;
  description: string;
  image?: string;
  tech?: string[];
  link?: string;
  repo?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadData<Project>("projects").then(setProjects);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
      <motion.h2
        className="text-5xl font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      {projects.length === 0 ? (
        <p className="text-neutral-500 text-sm">Loading projects...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 shadow-md hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {proj.image && (
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-48 object-cover rounded-t-2xl opacity-80 group-hover:opacity-100 transition"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-neutral-400 text-sm mb-3">
                  {proj.description}
                </p>

                {proj.tech && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 border border-neutral-700 rounded-full text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline text-sm"
                    >
                      Live →
                    </a>
                  )}
                  {proj.repo && (
                    <a
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-cyan-400 text-sm"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
