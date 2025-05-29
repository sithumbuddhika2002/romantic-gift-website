"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, CheckCircle, XCircle, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const quizQuestions = [
  {
    question: "What was the first thing that caught your attention about me?",
    options: ["Your smile", "Your eyes", "Your laugh", "Your kindness"],
    correct: 0,
    explanation: "Your beautiful smile was the first thing that made my heart skip a beat!",
  },
  {
    question: "What's my favorite way to spend a weekend with you?",
    options: ["Going on adventures", "Cozy movie nights", "Cooking together", "All of the above"],
    correct: 3,
    explanation: "Every moment with you is perfect, no matter what we're doing!",
  },
  {
    question: "What do I love most about our relationship?",
    options: ["How we laugh together", "How we support each other", "How we grow together", "All of these"],
    correct: 3,
    explanation: "Our love encompasses all of these beautiful aspects and so much more!",
  },
  {
    question: "What's my biggest dream for our future?",
    options: ["Traveling the world", "Building a family", "Growing old together", "Creating endless memories"],
    correct: 2,
    explanation: "Growing old with you, hand in hand, is my greatest dream come true!",
  },
]

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setShowExplanation(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  if (quizCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mb-8"
          >
            <Trophy className="text-gold-400 mx-auto" size={80} />
          </motion.div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-orange-400 bg-clip-text text-transparent mb-6">
            Quiz Complete!
          </h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-6xl font-bold text-pink-500 mb-4"
          >
            {score}/{quizQuestions.length}
          </motion.div>

          <p className="text-xl text-gray-700 mb-8">
            {score === quizQuestions.length
              ? "Perfect! You know our love story by heart! 💕"
              : score >= quizQuestions.length / 2
                ? "Great job! Our love shines through your answers! ✨"
                : "Every answer shows how much you care! 💖"}
          </p>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full px-8 py-4"
            >
              Take Quiz Again
            </Button>
          </div>

          {/* Celebration Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: "50%", y: "50%" }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, -200 - Math.random() * 200],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Heart className="text-pink-400" size={20} fill="#FFC0CB" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        How Well Do You Know Our Love?
      </motion.h2>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm text-gray-600">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{quizQuestions[currentQuestion].question}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                showResult
                  ? index === quizQuestions[currentQuestion].correct
                    ? "border-green-400 bg-green-50 text-green-800"
                    : selectedAnswer === index
                      ? "border-red-400 bg-red-50 text-red-800"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  : "border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700"
              }`}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                    {index === quizQuestions[currentQuestion].correct ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : selectedAnswer === index ? (
                      <XCircle className="text-red-500" size={24} />
                    ) : null}
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center mb-2">
                <Sparkles className="text-purple-500 mr-2" size={20} />
                <span className="font-semibold text-purple-700">Love Note:</span>
              </div>
              <p className="text-purple-600">{quizQuestions[currentQuestion].explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showResult && (
          <div className="text-center">
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-full px-8 py-4"
            >
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
