"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface HeartProps {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  color: string
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartProps[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i))
    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Remove oldest heart and add a new one
        const newHearts = [...prev]
        newHearts.shift()
        newHearts.push(createHeart(prev.length + Date.now()))
        return newHearts
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  function createHeart(id: number): HeartProps {
    const colors = ["#FFC0CB", "#E6A8D7", "#B19CD9", "#FFD700"]
    return {
      id,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 20 + 10, // Random size between 10-30px
      delay: Math.random() * 2, // Random delay before animation starts
      duration: Math.random() * 5 + 5, // Random duration between 5-10s
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 0,
              y: "110vh",
              x: `${heart.x}vw`,
              rotate: -10,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: "-10vh",
              rotate: 10,
              transition: {
                duration: heart.duration,
                delay: heart.delay,
                ease: "easeOut",
              },
            }}
            exit={{ opacity: 0 }}
            className="absolute"
          >
            <Heart
              size={heart.size}
              fill={heart.color}
              stroke="none"
              style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
