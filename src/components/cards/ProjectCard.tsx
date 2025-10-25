import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
}

export const ProjectCard = ({
  title,
  description,
  tech,
  link,
  image,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-cyan-400/60 transition shadow-lg overflow-hidden flex flex-col"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover opacity-90"
        />
      )}

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-semibold text-cyan-400 mb-2">{title}</h3>
          <p className="text-neutral-400 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md bg-neutral-800 text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-cyan-400 hover:underline text-sm"
          >
            Visit <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};
