import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadData } from "@/lib/loadData";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  tech?: string[];
};

export default function Experience() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    loadData<ExperienceItem>("experience").then(setExperience);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
      <motion.h2
        className="text-5xl font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      {experience.length === 0 ? (
        <p className="text-neutral-500 text-sm">Loading experience...</p>
      ) : (
        <div className="w-full max-w-3xl border-l border-neutral-800">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              className="relative pl-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Timeline marker */}
              <span className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-accent-cyan"></span>

              <h3 className="text-xl font-medium">{item.role}</h3>
              <p className="text-neutral-400 text-sm mb-1">{item.company}</p>
              <p className="text-neutral-500 text-xs mb-3">{item.period}</p>
              <p className="text-neutral-300 mb-3 leading-relaxed">
                {item.description}
              </p>

              {item.tech && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 border border-neutral-700 rounded-full text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
