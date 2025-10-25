import React, { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const Contact: React.FC = () => {
  const [meta, setMeta] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetch("/data/meta.json")
      .then((res) => res.json())
      .then(setMeta)
      .catch((err) => console.error("Failed to load meta.json", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form data:", form);
    alert("✅ Message sent (simulation). Connect backend to make it live!");
    setForm({ name: "", email: "", message: "" });
  };

  if (!meta) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-6 py-16">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-semibold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-neutral-400 text-center mt-2">
          I’m open to collaborations, freelance projects, or technical chats.
        </p>

        {/* Contact Info */}
        <div className="flex justify-center gap-6 mt-6">
          <a href={`mailto:${meta.email}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            <Mail className="w-6 h-6" />
          </a>
          <a href={meta.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            <Github className="w-6 h-6" />
          </a>
          <a href={meta.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href={meta.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-4 bg-neutral-900/50 p-6 rounded-2xl shadow-md"
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-cyan-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-cyan-500 outline-none"
            required
          />
          <textarea
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-cyan-500 outline-none h-32"
            required
          />
          <button
            type="submit"
            className="bg-cyan-500 text-black py-3 rounded-lg font-medium hover:bg-cyan-400 transition"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500 mt-10">
          Or email me directly at{" "}
          <a
            href={`mailto:${meta.email}`}
            className="text-cyan-400 hover:underline"
          >
            {meta.email}
          </a>
        </p>
      </div>
    </main>
  );
};

export default Contact;
