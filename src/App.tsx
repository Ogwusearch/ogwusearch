import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";

import "@/index.css";

export default function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
        {/* Global Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Theme Toggle (optional extra button) */}
        <div className="fixed bottom-5 right-5 z-50 md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </Router>
  );
}
