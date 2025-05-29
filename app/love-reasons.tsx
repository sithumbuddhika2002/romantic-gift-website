"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Star, Smile, Sun, Moon } from "lucide-react"

const reasons = [
  {
    icon: Heart,
    title: "Your Beautiful Heart",
    description: "The way you care for others and show kindness to everyone around you makes my heart skip a beat.",
    color: "from-pink-400 to-red-400",
  },
  {
    icon: Smile,
    title: "Your Infectious Smile",
    description: "Every time you smile, my whole world lights up. It's like sunshine on the cloudiest day.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Star,
    title: "Your Amazing Mind",
    description: "The way you think, your creativity, and your intelligence inspire me every single day.",
    color: "from-purple-400 to-indigo-400",
  },
  {
    icon: Sparkles,
    title: "Your Unique Spirit",
    description: "You're one of a kind, and I love every quirky, wonderful thing about your personality.",
    color: "from-green-400 to-teal-400",
  },
  {
    icon: Sun,
    title: "Your Positive Energy",
    description: "You bring light and positivity wherever you go, making everything better just by being there.",
    color: "from-amber-400 to-yellow-400",
  },
  {
    icon: Moon,
    title: "Your Gentle Soul",
    description: "Your compassion and empathy make you the most beautiful person I know, inside and out.",
    color: "from-blue-400 to-purple-400",
  },
]

export default function LoveReasons() {
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Why I Love You
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const IconComponent = reason.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedReason(selectedReason === index ? null : index)}
            >
              <motion.div
                className={`relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden`}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow:
                    hoveredCard === index
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: hoveredCard === index ? Number.POSITIVE_INFINITY : 0 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 mx-auto`}
                    animate={{
                      rotate: hoveredCard === index ? 360 : 0,
                      scale: hoveredCard === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="text-white" size={28} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{reason.title}</h3>

                  <AnimatePresence>
                    {(selectedReason === index || hoveredCard === index) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 text-center leading-relaxed"
                      >
                        {reason.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating Hearts */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, -50 - Math.random() * 50],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.3,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="absolute top-1/2 left-1/2 pointer-events-none"
                        >
                          <Heart className="text-pink-400" size={16} fill="#FFC0CB" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Heart Counter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-2xl text-purple-600 font-medium mb-4">
          And countless more reasons that I discover every day...
        </p>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block"
        >
          <Heart className="text-pink-400 mx-auto" size={40} fill="#FFC0CB" />
        </motion.div>
      </motion.div>
    </div>
  )
}
