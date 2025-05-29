"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, ChevronDown, Sparkles, Gift, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingHearts from "./floating-hearts"
import PhotoGallery from "./photo-gallery"
import MessageSection from "./message-section"
import CountdownTimer from "./countdown-timer"
import LoveReasons from "./love-reasons"
import MemoryTimeline from "./memory-timeline"
import InteractiveQuiz from "./interactive-quiz"
import SurpriseReveal from "./surprise-reveal"
import PlacesMap from "./places-map"
import FutureDreams from "./future-dreams"
import HeartCollector from "./heart-collector"
import MusicPlayer from "./music-player"
import ParticleBackground from "./particle-background"
import ConfettiEffect from "./confetti-effect"

export default function Home() {
  const [showHearts, setShowHearts] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reasonsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const quizRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const dreamsRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)
  const surpriseRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHearts(true)
    }, 2000)

    const confettiTimer = setTimeout(() => {
      setShowConfetti(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(confettiTimer)
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sections = [
    { ref: heroRef, name: "Hero" },
    { ref: galleryRef, name: "Memories" },
    { ref: reasonsRef, name: "Reasons" },
    { ref: timelineRef, name: "Timeline" },
    { ref: quizRef, name: "Quiz" },
    { ref: messageRef, name: "Letter" },
    { ref: mapRef, name: "Places" },
    { ref: dreamsRef, name: "Dreams" },
    { ref: countdownRef, name: "Countdown" },
    { ref: surpriseRef, name: "Surprise" },
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50 overflow-x-hidden">
      <ParticleBackground />
      {showHearts && <FloatingHearts />}
      {showConfetti && <ConfettiEffect />}

      {/* Fixed Music Player */}
      <MusicPlayer />

      {/* Fixed Heart Collector Game */}
      <HeartCollector />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((section, index) => (
          <motion.button
            key={section.name}
            onClick={() => scrollToSection(section.ref)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? "bg-pink-400 scale-125" : "bg-pink-200 hover:bg-pink-300"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ opacity, scale }}
          className="text-center z-10 px-4"
        >
          <motion.div
            animate={{ rotate }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mb-8"
          >
            <Sparkles className="text-gold-300 mx-auto" size={60} />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-gold-300 bg-clip-text text-transparent mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            For My Beloved
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-purple-600 mb-12 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            An interactive journey through our love story
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Button
              onClick={() => scrollToSection(galleryRef)}
              className="group relative bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full px-12 py-8 text-xl font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Begin Our Adventure</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-300 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
          className="absolute bottom-10"
        >
          <ChevronDown
            className="text-pink-400 cursor-pointer drop-shadow-lg"
            size={50}
            onClick={() => scrollToSection(galleryRef)}
          />
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,192,203,0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_70%)]" />
        </div>
      </div>

      {/* Photo Gallery Section */}
      <motion.div
        ref={galleryRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Beautiful Memories
          </motion.h2>
          <PhotoGallery />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(reasonsRef)}
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Heart className="mr-2" size={20} />
              Why I Love You
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Love Reasons Section */}
      <motion.div
        ref={reasonsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <LoveReasons />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(timelineRef)}
              className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-2" size={20} />
              Our Journey
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Memory Timeline Section */}
      <motion.div
        ref={timelineRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <MemoryTimeline />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(quizRef)}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2" size={20} />
              Test Your Love
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Interactive Quiz Section */}
      <motion.div
        ref={quizRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto">
          <InteractiveQuiz />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(messageRef)}
              className="bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Heart className="mr-2" size={20} />
              Read My Letter
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Message Section */}
      <motion.div
        ref={messageRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <MessageSection />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(mapRef)}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <MapPin className="mr-2" size={20} />
              Our Special Places
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Places Map Section */}
      <motion.div
        ref={mapRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4 bg-gradient-to-br from-orange-50 via-pink-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto">
          <PlacesMap />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(dreamsRef)}
              className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2" size={20} />
              Our Future Dreams
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Future Dreams Section */}
      <motion.div
        ref={dreamsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <FutureDreams />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(countdownRef)}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-2" size={20} />
              Special Countdown
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Countdown Section */}
      <motion.div
        ref={countdownRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      >
        <div className="max-w-5xl mx-auto">
          <CountdownTimer />
          <div className="text-center mt-20">
            <Button
              onClick={() => scrollToSection(surpriseRef)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full px-10 py-6 text-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Gift className="mr-2" size={20} />
              Final Surprise
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Surprise Reveal Section */}
      <motion.div
        ref={surpriseRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="min-h-screen py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <SurpriseReveal />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-12 text-center bg-gradient-to-r from-pink-100 to-purple-100 border-t border-pink-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-pink-600 font-medium mb-4">Made with infinite love, for you. Today and always.</p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="text-pink-400" size={24} fill="#FFC0CB" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </footer>
    </main>
  )
}
