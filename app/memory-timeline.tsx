"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Heart, Star, Camera, Gift } from "lucide-react"

const memories = [
  {
    date: "First Meeting",
    title: "The Day Everything Changed",
    description:
      "When our eyes first met, I knew my life would never be the same. That spark, that connection - it was magical.",
    icon: Heart,
    color: "from-pink-400 to-red-400",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    date: "First Date",
    title: "Coffee and Conversations",
    description:
      "Hours felt like minutes as we talked about everything and nothing. I knew I wanted to spend forever getting to know you.",
    icon: Star,
    color: "from-purple-400 to-indigo-400",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    date: "First Kiss",
    title: "Under the Stars",
    description:
      "Time stood still in that perfect moment. The world faded away, and it was just us, just that magical kiss.",
    icon: Heart,
    color: "from-blue-400 to-purple-400",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    date: "First Trip",
    title: "Adventure Together",
    description:
      "Our first adventure together showed me what it meant to explore the world with your best friend by your side.",
    icon: MapPin,
    color: "from-green-400 to-teal-400",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    date: "Moving In",
    title: "Home is Where You Are",
    description: "Creating our first home together, where every corner holds a memory and every day brings new joy.",
    icon: Gift,
    color: "from-orange-400 to-pink-400",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    date: "Today",
    title: "Still Falling",
    description:
      "Every day I fall deeper in love with you. Our story is still being written, and I can't wait for the next chapter.",
    icon: Camera,
    color: "from-gold-300 to-yellow-400",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [hoveredMemory, setHoveredMemory] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Our Love Story Timeline
      </motion.h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 rounded-full" />

        {memories.map((memory, index) => {
          const IconComponent = memory.icon
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative flex items-center mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              onMouseEnter={() => setHoveredMemory(index)}
              onMouseLeave={() => setHoveredMemory(null)}
            >
              {/* Content Card */}
              <motion.div
                className={`w-5/12 ${isLeft ? "pr-8" : "pl-8"}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedMemory(selectedMemory === index ? null : index)}
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 cursor-pointer overflow-hidden relative group"
                  animate={{
                    boxShadow:
                      hoveredMemory === index
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${memory.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{
                      scale: hoveredMemory === index ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 3, repeat: hoveredMemory === index ? Number.POSITIVE_INFINITY : 0 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${memory.color} flex items-center justify-center mr-4`}
                        animate={{
                          rotate: hoveredMemory === index ? 360 : 0,
                        }}
                        transition={{ duration: 1 }}
                      >
                        <IconComponent className="text-white" size={20} />
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">{memory.date}</p>
                        <h3 className="text-xl font-bold text-gray-800">{memory.title}</h3>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-4">{memory.description}</p>

                    <AnimatePresence>
                      {selectedMemory === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          <img
                            src={memory.image || "/placeholder.svg"}
                            alt={memory.title}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Floating particles */}
                  <AnimatePresence>
                    {hoveredMemory === index && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              x: [0, (Math.random() - 0.5) * 200],
                              y: [0, -100 - Math.random() * 100],
                            }}
                            transition={{
                              duration: 3,
                              delay: i * 0.2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="absolute top-1/2 left-1/2 pointer-events-none"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${memory.color}`} />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Timeline Node */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 z-10"
                animate={{
                  scale: hoveredMemory === index ? 1.5 : 1,
                  rotate: hoveredMemory === index ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${memory.color} border-4 border-white shadow-lg`}
                />
              </motion.div>

              {/* Empty space for opposite side */}
              <div className="w-5/12" />
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-2xl text-purple-600 font-medium mb-4">
          Our story continues to unfold, one beautiful moment at a time...
        </p>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Calendar className="text-blue-400 mx-auto" size={40} />
        </motion.div>
      </motion.div>
    </div>
  )
}
