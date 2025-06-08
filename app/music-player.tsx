"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react"

const playlist = [
  {
    title: "Our Song",
    artist: "Your Favorite Artist",
    src: "/music/our-song.mp3",
    description: "The song that was playing when we first met",
  },
  {
    title: "First Dance",
    artist: "Romantic Artist",
    src: "/music/first-dance.mp3",
    description: "Our first dance together",
  },
  {
    title: "Love Melody",
    artist: "Sweet Singer",
    src: "/music/love-playlist.mp3",
    description: "The tune that reminds me of you",
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => nextTrack()

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrack])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Number.parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume
          }
        }}
      />

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
            className="fixed bottom-20 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 min-w-[320px]"
          >
            {/* Track Info */}
            <div className="text-center mb-4">
              <h4 className="font-bold text-gray-800 text-lg">{playlist[currentTrack].title}</h4>
              <p className="text-sm text-gray-600 mb-1">{playlist[currentTrack].artist}</p>
              <p className="text-xs text-gray-500 italic">{playlist[currentTrack].description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <motion.button
                onClick={prevTrack}
                className="text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={20} />
              </motion.button>

              <motion.button
                onClick={togglePlay}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>

              <motion.button
                onClick={nextTrack}
                className="text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={20} />
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleMute}
                className="text-gray-600 hover:text-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Playlist */}
            <div className="mt-4 max-h-32 overflow-y-auto">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Playlist</h5>
              {playlist.map((track, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index)
                    setIsPlaying(false)
                  }}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                    currentTrack === index
                      ? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium">{track.title}</div>
                  <div className="text-xs opacity-75">{track.artist}</div>
                </motion.button>
              ))}
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

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  )
}
