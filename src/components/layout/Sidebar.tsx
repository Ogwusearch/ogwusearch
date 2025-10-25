import { Link, useLocation } from "react-router-dom";
import { Home, User, Layers, Briefcase, PenTool, Mail, Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about", icon: User },
    { label: "Projects", path: "/projects", icon: Layers },
    { label: "Experience", path: "/experience", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: PenTool },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 h-screen border-r border-neutral-800 bg-neutral-950 items-center py-6 gap-6">
      {navItems.map(({ path, icon: Icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link key={path} to={path} className={`p-2 rounded-lg ${isActive ? "bg-cyan-400/20 text-cyan-400" : "text-neutral-400 hover:bg-neutral-800 hover:text-cyan-400 transition"}`}>
            <Icon size={20} />
          </Link>
        );
      })}
      <div className="mt-auto flex flex-col gap-4 items-center">
        <a href="https://github.com/ogwusearch" target="_blank" rel="noreferrer">
          <Github size={18} className="hover:text-cyan-400 transition" />
        </a>
        <a href="https://linkedin.com/in/ogwusearch" target="_blank" rel="noreferrer">
          <Linkedin size={18} className="hover:text-cyan-400 transition" />
        </a>
        <ThemeToggle />
      </div>
    </aside>
  );
};
