import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/ogwusearch",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/ogwusearch",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@ogwusearch.dev",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-20 border-t border-neutral-800 py-8 text-center text-neutral-400 bg-neutral-950"
    >
      <div className="flex justify-center gap-6 mb-4">
        {socials.map(({ name, icon: Icon, url }) => (
          <motion.a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-neutral-400 hover:text-cyan-400 transition"
          >
            <Icon size={20} />
          </motion.a>
        ))}
      </div>

      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-400 font-medium">Ogwusearch</span> — Crafted
        with 💻 & creativity.
      </p>
    </motion.footer>
  );
};
