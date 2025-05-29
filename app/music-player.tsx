"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, you would control actual audio playback here
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In a real implementation, you would control audio volume here
  }

  return (
    <>
      {/* Music Toggle Button */}
      <motion.button
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          rotate: { duration: 3, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
        }}
      >
        <Music size={24} />
      </motion.button>

      {/* Music Player */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 min-w-[250px]"
          >
            <div className="text-center mb-4">
              <h4 className="font-semibold text-gray-800">Our Love Playlist</h4>
              <p className="text-sm text-gray-600">Currently: "Perfect" by Ed Sheeran</p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={togglePlay}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              <motion.button
                onClick={toggleMute}
                className="text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
            </div>

            {/* Animated Sound Waves */}
            <AnimatePresence>
              {isPlaying && (
                <div className="flex items-center justify-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-full"
                      animate={{
                        height: [4, 20, 4],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
