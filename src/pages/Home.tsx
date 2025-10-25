import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  image?: string;
}

interface Skill {
  name: string;
  level: number;
  icon?: string;
  link?: string;
}

interface Article {
  title: string;
  date: string;
  summary: string;
  image?: string;
  link?: string;
  tags?: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollSpeed = 1; // px per frame

  useEffect(() => {
    fetch("/data/projects.json").then((res) => res.json()).then(setProjects);
    fetch("/data/skills.json").then((res) => res.json()).then(setSkills);
    fetch("/data/blog.json").then((res) => res.json()).then(setArticles);
  }, []);

  // Infinite autoplay scroll
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (carouselRef.current && !isHovered) {
        const container = carouselRef.current;
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount =
      direction === "left" ? -carouselRef.current.offsetWidth : carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Hero Section */}
      <motion.section
        className="min-h-[70vh] flex flex-col justify-center items-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Building Intelligent & Scalable Software
        </h1>
        <p className="text-neutral-400 max-w-2xl mb-6">
          I’m <span className="text-cyan-400 font-medium">Ogwusearch</span> — a software engineer
          crafting high-performance apps, tools, and AI-driven platforms with TypeScript, Node.js,
          and modern web tech.
        </p>
        <Button size="lg" onClick={() => window.open("mailto:contact@ogwusearch.dev")}>
          Let’s Connect
        </Button>
      </motion.section>

      {/* Featured Projects Carousel */}
      <motion.section
        className="w-full max-w-6xl px-6 py-16 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-left">Featured Projects</h2>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 py-4 snap-x snap-mandatory"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {[...projects, ...projects].map((project, i) => (
            <motion.div
              key={i}
              className="snap-start min-w-[280px] md:min-w-[320px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => project.link && window.open(project.link)}
            >
              <Card className="bg-neutral-900 border-neutral-800">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-cyan-400">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-neutral-800 px-2 py-1 rounded-md text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.repo && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.repo);
                      }}
                    >
                      View Code
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -left-2 -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-cyan-500/70 transition z-10"
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -right-2 -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-cyan-500/70 transition z-10"
        >
          ▶
        </button>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" onClick={() => (window.location.href = "/projects")}>
            View All Projects
          </Button>
        </div>
      </motion.section>

      {/* Skills & Tools */}
      <motion.section
        className="w-full max-w-6xl px-6 pb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-10 text-left">Skills & Tools</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-cyan-500 transition cursor-pointer"
              onClick={() => skill.link && window.open(skill.link)}
            >
              <div className="flex items-center gap-3 mb-3">
                {skill.icon && <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />}
                <h3 className="text-lg font-medium text-cyan-400">{skill.name}</h3>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <motion.div
                  className="bg-cyan-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Recent Articles / Blog */}
      <motion.section
        className="w-full max-w-6xl px-6 pb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-10 text-left">Recent Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article, i) => (
            <Card
              key={i}
              className="bg-neutral-900 border-neutral-800 hover:border-cyan-500 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => article.link && window.open(article.link)}
            >
              <CardHeader>
                <CardTitle className="text-cyan-400">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400 text-sm mb-2">{article.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-neutral-800 px-2 py-1 rounded-md text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
