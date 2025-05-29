"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trophy } from "lucide-react"

export default function HeartCollector() {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    if (!showGame) return

    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 50),
        y: -50,
      }
      setHearts((prev) => [...prev, newHeart])

      // Remove hearts that fall off screen
      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id))
      }, 5000)
    }, 2000)

    return () => clearInterval(interval)
  }, [showGame])

  const collectHeart = (heartId: number) => {
    setScore((prev) => prev + 1)
    setHearts((prev) => prev.filter((heart) => heart.id !== heartId))
  }

  return (
    <>
      {/* Game Toggle Button */}
      <motion.button
        onClick={() => setShowGame(!showGame)}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart size={24} />
      </motion.button>

      {/* Score Display */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Trophy className="text-gold-400" size={20} />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Hearts */}
      <AnimatePresence>
        {showGame &&
          hearts.map((heart) => (
            <motion.button
              key={heart.id}
              initial={{ x: heart.x, y: heart.y, opacity: 1 }}
              animate={{ y: window.innerHeight + 50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              onClick={() => collectHeart(heart.id)}
              className="fixed z-40 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Heart className="text-pink-400" size={30} fill="#FFC0CB" />
            </motion.button>
          ))}
      </AnimatePresence>
    </>
  )
}
