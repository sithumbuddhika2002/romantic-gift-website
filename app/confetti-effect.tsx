"use client"

import { motion } from "framer-motion"

export default function ConfettiEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
          className={`absolute w-3 h-3 ${
            i % 4 === 0 ? "bg-pink-400" : i % 4 === 1 ? "bg-purple-400" : i % 4 === 2 ? "bg-gold-300" : "bg-blue-400"
          } ${Math.random() > 0.5 ? "rounded-full" : "rounded-none"}`}
        />
      ))}
    </div>
  )
}
