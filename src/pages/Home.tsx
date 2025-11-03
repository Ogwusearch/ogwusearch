import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  image?: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="snap-start min-w-[280px] md:min-w-[320px] cursor-pointer flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      onClick={() => project.link && window.open(project.link)}
    >
      <Card className="bg-neutral-900 border-neutral-800">
        {project.image && (
          <img
            src={project.image}
            alt={project.title || "Project image"}
            className="w-full h-40 object-cover rounded-t-lg"
            loading="lazy"
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
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const scrollSpeed = 1;

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error("Failed to load projects:", err));
  }, []);

  // Duplicate projects for infinite effect
  const carouselProjects = useMemo(() => [...projects, ...projects], [projects]);

  // Autoplay with motion value
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let frame: number;

    const animate = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [projects]);

  return (
    <div className="w-full max-w-6xl px-6 py-16 relative">
      <h2 className="text-3xl font-semibold mb-6 text-left">Featured Projects</h2>

      <motion.div
        ref={carouselRef}
        className="flex overflow-x-hidden gap-6 py-4 cursor-grab"
        drag="x"
        dragElastic={0.1}
        dragConstraints={{ left: -Infinity, right: Infinity }}
        onDragEnd={() => {
          // reset scroll for seamless infinite drag
          const container = carouselRef.current;
          if (!container) return;
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft -= container.scrollWidth / 2;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += container.scrollWidth / 2;
          }
        }}
      >
        {carouselProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* Carousel Arrows */}
      <button
        aria-label="Scroll left"
        onClick={() => carouselRef.current?.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" })}
        className="absolute top-1/2 -left-2 -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-cyan-500/70 transition z-10"
      >
        ◀
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => carouselRef.current?.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" })}
        className="absolute top-1/2 -right-2 -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-cyan-500/70 transition z-10"
      >
        ▶
      </button>
    </div>
  );
}
