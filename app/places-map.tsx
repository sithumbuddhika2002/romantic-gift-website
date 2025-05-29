"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Heart, Camera, Star, Coffee, Plane } from "lucide-react"

const specialPlaces = [
  {
    name: "Where We First Met",
    description:
      "The coffee shop where our eyes first met and our story began. I still get butterflies every time I walk by.",
    icon: Coffee,
    color: "from-amber-400 to-orange-400",
    coordinates: { x: 20, y: 30 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Our First Date",
    description: "The restaurant where we talked for hours and I knew I wanted to spend forever getting to know you.",
    icon: Heart,
    color: "from-pink-400 to-red-400",
    coordinates: { x: 45, y: 25 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "First Kiss Spot",
    description: "Under the old oak tree in the park, where time stood still and our hearts became one.",
    icon: Star,
    color: "from-purple-400 to-indigo-400",
    coordinates: { x: 60, y: 40 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Weekend Getaway",
    description: "The beach house where we watched sunsets and made promises to each other under the stars.",
    icon: Camera,
    color: "from-blue-400 to-teal-400",
    coordinates: { x: 75, y: 60 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Adventure Together",
    description: "The mountain we climbed together, proving that we can conquer anything side by side.",
    icon: Plane,
    color: "from-green-400 to-emerald-400",
    coordinates: { x: 30, y: 70 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Our Home",
    description:
      "The place where we built our life together, where every corner holds a memory and every day brings new joy.",
    icon: Heart,
    color: "from-rose-400 to-pink-400",
    coordinates: { x: 50, y: 50 },
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PlacesMap() {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Our Special Places
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-3xl overflow-hidden shadow-2xl">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Place Markers */}
            {specialPlaces.map((place, index) => {
              const IconComponent = place.icon
              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${place.coordinates.x}%`,
                    top: `${place.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredPlace(index)}
                  onMouseLeave={() => setHoveredPlace(null)}
                  onClick={() => setSelectedPlace(selectedPlace === index ? null : index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${place.color} flex items-center justify-center shadow-lg border-4 border-white`}
                    animate={{
                      scale: hoveredPlace === index ? [1, 1.2, 1] : 1,
                      boxShadow: hoveredPlace === index ? "0 10px 25px rgba(0,0,0,0.3)" : "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="text-white" size={20} />
                  </motion.div>

                  {/* Ripple Effect */}
                  <AnimatePresence>
                    {hoveredPlace === index && (
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${place.color} opacity-30`}
                        initial={{ scale: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ scale: 1, opacity: 0.3 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredPlace === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg whitespace-nowrap z-10"
                      >
                        <p className="text-sm font-medium text-gray-800">{place.name}</p>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {specialPlaces.map((place, index) => {
                if (index === specialPlaces.length - 1) return null
                const nextPlace = specialPlaces[index + 1]
                return (
                  <motion.line
                    key={index}
                    x1={`${place.coordinates.x}%`}
                    y1={`${place.coordinates.y}%`}
                    x2={`${nextPlace.coordinates.x}%`}
                    y2={`${nextPlace.coordinates.y}%`}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.5 }}
                  />
                )
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Place Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            {selectedPlace !== null ? (
              <motion.div
                key={selectedPlace}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${specialPlaces[selectedPlace].color} flex items-center justify-center mr-4`}
                  >
                    {React.createElement(specialPlaces[selectedPlace].icon, { className: "text-white", size: 28 })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{specialPlaces[selectedPlace].name}</h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{specialPlaces[selectedPlace].description}</p>

                <img
                  src={specialPlaces[selectedPlace].image || "/placeholder.svg"}
                  alt={specialPlaces[selectedPlace].name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center"
              >
                <MapPin className="text-pink-400 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Our Journey</h3>
                <p className="text-gray-600">
                  Click on any location on the map to discover the special memories we've created together.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 gap-3">
            {specialPlaces.map((place, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedPlace(index)}
                className={`p-3 rounded-xl text-left transition-all duration-300 ${
                  selectedPlace === index
                    ? `bg-gradient-to-r ${place.color} text-white shadow-lg`
                    : "bg-white/70 hover:bg-white text-gray-700 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  {React.createElement(place.icon, { size: 16, className: "mr-2" })}
                  <span className="text-sm font-medium truncate">{place.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p className="text-2xl text-orange-600 font-medium mb-4">
          Every place tells a story, and every story brings us closer together...
        </p>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <MapPin className="text-orange-400 mx-auto" size={40} />
        </motion.div>
      </motion.div>
    </div>
  )
}
