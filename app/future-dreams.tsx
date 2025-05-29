"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Home, Plane, Baby, BellRingIcon as Ring, Star, Mountain } from "lucide-react"

const dreams = [
  {
    title: "Travel the World Together",
    description: "Exploring every corner of the earth, hand in hand, creating memories in every country we visit.",
    icon: Plane,
    color: "from-blue-400 to-cyan-400",
    details:
      "From the romantic streets of Paris to the serene beaches of Bali, we'll collect passport stamps and heart-warming moments.",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Our Dream Home",
    description: "Building a cozy sanctuary where our love can flourish and our future family can grow.",
    icon: Home,
    color: "from-green-400 to-emerald-400",
    details:
      "A place with a garden where we can watch sunsets, a kitchen where we cook together, and rooms filled with laughter.",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Growing Our Family",
    description: "Welcoming little ones who will be the perfect blend of our love and dreams.",
    icon: Baby,
    color: "from-pink-400 to-rose-400",
    details: "Teaching them about love, kindness, and adventure while watching them discover the world with wonder.",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Forever Commitment",
    description: "Promising each other forever in front of everyone we love most.",
    icon: Ring,
    color: "from-purple-400 to-indigo-400",
    details:
      "A celebration of our love story, surrounded by family and friends, marking the beginning of our official forever.",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Adventure Together",
    description: "Conquering mountains, diving into oceans, and exploring the unknown side by side.",
    icon: Mountain,
    color: "from-orange-400 to-red-400",
    details:
      "From hiking trails to scuba diving, every adventure will be better because we're experiencing it together.",
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "Growing Old Together",
    description: "Sitting on our porch, holding hands, and reminiscing about all our beautiful memories.",
    icon: Star,
    color: "from-gold-300 to-yellow-400",
    details: "Watching our grandchildren play while we share stories of our incredible journey through life together.",
    image: "/placeholder.svg?height=250&width=400",
  },
]

export default function FutureDreams() {
  const [selectedDream, setSelectedDream] = useState<number | null>(null)
  const [hoveredDream, setHoveredDream] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Our Future Dreams
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dreams.map((dream, index) => {
          const IconComponent = dream.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredDream(index)}
              onMouseLeave={() => setHoveredDream(null)}
              onClick={() => setSelectedDream(selectedDream === index ? null : index)}
            >
              <motion.div
                className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 h-full"
                whileHover={{ scale: 1.03, rotateY: 5 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow:
                    hoveredDream === index
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${dream.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredDream === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 3, repeat: hoveredDream === index ? Number.POSITIVE_INFINITY : 0 }}
                />

                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${dream.color} flex items-center justify-center mb-6 mx-auto`}
                    animate={{
                      rotate: hoveredDream === index ? 360 : 0,
                      scale: hoveredDream === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <IconComponent className="text-white" size={32} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{dream.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed mb-4">{dream.description}</p>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {selectedDream === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-4 mt-4"
                      >
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{dream.details}</p>
                        <img
                          src={dream.image || "/placeholder.svg"}
                          alt={dream.title}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating Elements */}
                <AnimatePresence>
                  {hoveredDream === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
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
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${dream.color}`} />
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

      {/* Interactive Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-3xl font-bold text-purple-600 mb-8">Our Journey Ahead</h3>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 to-pink-300 rounded-full" />

          {dreams.slice(0, 4).map((dream, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <h4 className="text-lg font-semibold text-gray-800">{dream.title}</h4>
                <p className="text-gray-600 text-sm">{dream.description}</p>
              </div>

              <motion.div className="absolute left-1/2 transform -translate-x-1/2 z-10" whileHover={{ scale: 1.2 }}>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${dream.color} border-4 border-white shadow-lg`}
                />
              </motion.div>

              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-2xl text-purple-600 font-medium mb-4">
          Every dream is more beautiful because I'll be sharing it with you...
        </p>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Heart className="text-purple-400 mx-auto" size={40} fill="#C084FC" />
        </motion.div>
      </motion.div>
    </div>
  )
}
