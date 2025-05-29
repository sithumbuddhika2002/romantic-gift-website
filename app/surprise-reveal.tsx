"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart, Sparkles, Star, Music, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SurpriseReveal() {
  const [currentSurprise, setCurrentSurprise] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const surprises = [
    {
      title: "A Personal Playlist",
      description: "I've created a playlist of all the songs that remind me of you and our journey together.",
      icon: Music,
      color: "from-purple-400 to-pink-400",
      content:
        "🎵 Our Love Song Collection 🎵\n\n1. The song that was playing when we first met\n2. Our first dance song\n3. The tune you always hum\n4. Songs for our road trips\n5. Melodies that make me think of you",
    },
    {
      title: "A Digital Scrapbook",
      description: "Every photo, every moment, every smile - all compiled into our personal love story.",
      icon: Camera,
      color: "from-blue-400 to-purple-400",
      content:
        "📸 Our Memory Collection 📸\n\nHundreds of photos capturing:\n• Our silly moments\n• Our adventures\n• Your beautiful smile\n• Us being completely ourselves\n• Every milestone we've shared",
    },
    {
      title: "Love Letters Collection",
      description: "All the little notes and messages I've wanted to write but never found the perfect moment.",
      icon: Heart,
      color: "from-pink-400 to-red-400",
      content:
        "💌 Letters From My Heart 💌\n\n• Why I love your morning voice\n• How you make ordinary days magical\n• The way you care for others\n• Your incredible strength\n• How you've changed my world",
    },
    {
      title: "Future Adventure Plans",
      description: "I've been secretly planning all the amazing places we'll visit and experiences we'll share.",
      icon: Star,
      color: "from-gold-300 to-orange-400",
      content:
        "✨ Our Adventure Bucket List ✨\n\n• Weekend getaway to the mountains\n• Surprise dinner at that restaurant you mentioned\n• Tickets to see your favorite band\n• A cooking class for two\n• And many more surprises...",
    },
  ]

  const handleReveal = () => {
    setIsRevealed(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const nextSurprise = () => {
    if (currentSurprise < surprises.length - 1) {
      setCurrentSurprise(currentSurprise + 1)
      setIsRevealed(false)
    }
  }

  const prevSurprise = () => {
    if (currentSurprise > 0) {
      setCurrentSurprise(currentSurprise - 1)
      setIsRevealed(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto text-center">
      <motion.h2
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        One Final Surprise
      </motion.h2>

      {/* Surprise Counter */}
      <div className="flex justify-center mb-8">
        {surprises.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${index === currentSurprise ? "bg-pink-400" : "bg-gray-300"}`}
            animate={{
              scale: index === currentSurprise ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSurprise}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Gift Box */}
          <motion.div className="relative mx-auto mb-8" style={{ width: 200, height: 200 }}>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${surprises[currentSurprise].color} rounded-3xl shadow-2xl`}
              animate={{
                rotateY: isRevealed ? 180 : 0,
                scale: isRevealed ? 1.1 : 1,
              }}
              transition={{ duration: 0.8 }}
            />

            {!isRevealed && (
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotateY: 0 }}>
                <Gift className="text-white" size={80} />
              </motion.div>
            )}

            {isRevealed && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.4 }}
              >
                {React.createElement(surprises[currentSurprise].icon, {
                  className: "text-white",
                  size: 80,
                })}
              </motion.div>
            )}

            {/* Sparkles around the gift */}
            <AnimatePresence>
              {isRevealed && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, Math.cos((i * 45 * Math.PI) / 180) * 100],
                        y: [0, Math.sin((i * 45 * Math.PI) / 180) * 100],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                      className="absolute top-1/2 left-1/2"
                    >
                      <Sparkles className="text-gold-400" size={20} />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Surprise Content */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{surprises[currentSurprise].title}</h3>
            <p className="text-gray-600 mb-6">{surprises[currentSurprise].description}</p>

            {!isRevealed ? (
              <Button
                onClick={handleReveal}
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full px-8 py-4 text-lg"
              >
                <Gift className="mr-2" size={20} />
                Open Surprise
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
                  <pre className="text-gray-700 whitespace-pre-line text-left">
                    {surprises[currentSurprise].content}
                  </pre>
                </div>

                {/* Navigation */}
                <div className="flex justify-center space-x-4">
                  {currentSurprise > 0 && (
                    <Button
                      onClick={prevSurprise}
                      className="bg-gray-400 hover:bg-gray-500 text-white rounded-full px-6 py-3"
                    >
                      Previous
                    </Button>
                  )}
                  {currentSurprise < surprises.length - 1 && (
                    <Button
                      onClick={nextSurprise}
                      className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full px-6 py-3"
                    >
                      Next Surprise
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Final Message */}
      {currentSurprise === surprises.length - 1 && isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-purple-600 mb-4">Thank You for Being You</h3>
          <p className="text-xl text-purple-700 leading-relaxed">
            This website is just a small token of my infinite love for you. Every day with you is a gift, and I can't
            wait to create countless more memories together. You are my everything, today and always.
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="mt-6"
          >
            <Heart className="text-pink-500 mx-auto" size={50} fill="#EC4899" />
          </motion.div>
        </motion.div>
      )}

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                }}
                className={`absolute w-3 h-3 ${Math.random() > 0.5 ? "bg-pink-400" : "bg-purple-400"} rounded-full`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
