import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Layers,
  PenTool,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Scroll progress bar animation
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Auto-hide navbar on scroll down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setVisible(latest < prev || latest < 50);
  });

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about", icon: User },
    { label: "Projects", path: "/projects", icon: Layers },
    { label: "Experience", path: "/experience", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: PenTool },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-neutral-900/70 border-b border-neutral-800 shadow-lg"
      >
        <div className="flex justify-between items-center px-6 py-4 md:px-10">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Ogwusearch
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            {navItems.map(({ label, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <motion.div key={path} className="relative">
                  <Link
                    to={path}
                    className={`flex items-center gap-2 px-2 py-1 transition ${
                      isActive
                        ? "text-cyan-400"
                        : "text-neutral-300 hover:text-cyan-400"
                    }`}
                  >
                    <Icon size={16} /> {label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-cyan-400 rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Social Links + Theme */}
            <div className="flex items-center gap-3 ml-4">
              <a
                href="https://github.com/ogwusearch"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/ogwusearch"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:contact@ogwusearch.dev"
                className="hover:text-cyan-400 transition"
              >
                <Mail size={18} />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col items-center gap-4 pb-6 text-neutral-300 border-t border-neutral-800 bg-neutral-950"
            >
              {navItems.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 py-2 hover:text-cyan-400 transition ${
                    location.pathname === path ? "text-cyan-400" : ""
                  }`}
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}
              <div className="flex gap-4 mt-3">
                <a
                  href="https://github.com/ogwusearch"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={18} className="hover:text-cyan-400 transition" />
                </a>
                <a
                  href="https://linkedin.com/in/ogwusearch"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin
                    size={18}
                    className="hover:text-cyan-400 transition"
                  />
                </a>
                <a href="mailto:contact@ogwusearch.dev">
                  <Mail size={18} className="hover:text-cyan-400 transition" />
                </a>
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
