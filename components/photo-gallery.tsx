"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PhotoGallery() {
  // This would be replaced with actual photos
  const photos = [
    { id: 1, src: "/images/1st.jpg", alt: "Our first date" },
    { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Summer vacation" },
    { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Birthday celebration" },
    { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Holiday memories" },
    { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Weekend getaway" },
    { id: 6, src: "/placeholder.svg?height=400&width=600", alt: "Special moment" },
  ]

  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          layoutId={`photo-container-${photo.id}`}
          onClick={() => setSelectedId(photo.id)}
          className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            width={600}
            height={400}
            className="w-full h-64 object-cover"
          />
          <motion.div
            className="p-4 bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-pink-500 font-medium">{photo.alt}</p>
          </motion.div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={`photo-container-${selectedId}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos.find((p) => p.id === selectedId)?.src || ""}
                alt={photos.find((p) => p.id === selectedId)?.alt || ""}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pink-500 mb-2">
                  {photos.find((p) => p.id === selectedId)?.alt}
                </h3>
                <p className="text-gray-600">Add a special description or memory about this moment here.</p>
                <button
                  onClick={() => setSelectedId(null)}
                  className="mt-4 px-4 py-2 bg-lavender-400 text-white rounded-md hover:bg-lavender-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Import AnimatePresence at the top
import { AnimatePresence } from "framer-motion"
