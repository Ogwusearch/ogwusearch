import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadData } from "@/lib/loadData";

type Article = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  link?: string;
  tags?: string[];
};

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadData<Article>("articles").then(setArticles);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
      <motion.h2
        className="text-5xl font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Blog
      </motion.h2>

      {articles.length === 0 ? (
        <p className="text-neutral-500 text-sm">Loading articles...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {articles.map((post, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 shadow-md hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-2xl opacity-80 group-hover:opacity-100 transition"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-neutral-500 text-xs mb-2">{post.date}</p>
                <p className="text-neutral-400 text-sm mb-3">{post.summary}</p>

                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-neutral-700 rounded-full text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline text-sm"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
