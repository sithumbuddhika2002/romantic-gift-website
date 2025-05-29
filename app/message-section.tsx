"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"

export default function MessageSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12"
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Heart className="text-pink-400" size={48} fill="#FFC0CB" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-8">My Love Letter to You</h2>

      <div className="space-y-6 text-lg text-gray-700">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="first-letter:text-3xl first-letter:font-bold first-letter:text-pink-500 first-letter:float-left first-letter:mr-2"
        >
          From the moment our paths crossed, I knew there was something special about you. Your smile, your laugh, the
          way your eyes light up when you talk about things you love - all of these little details have woven themselves
          into the fabric of my heart.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every day with you feels like a gift. You've shown me what it means to truly care for someone, to support them
          through both sunshine and storms. Your kindness, your strength, and your beautiful spirit inspire me to be the
          best version of myself.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          I cherish our adventures together, the quiet moments we share, and even the challenges we've overcome. With
          you, every ordinary day becomes extraordinary. You are my best friend, my confidant, my partner in all things.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="font-medium text-pink-500"
        >
          I love you more than words can express, and I'm grateful for every moment we share. Here's to many more
          memories, adventures, and years of growing together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-right italic"
        >
          Forever yours,
        </motion.p>
      </div>
    </motion.div>
  )
}
