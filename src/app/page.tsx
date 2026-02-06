'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [candleLit, setCandleLit] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const { width, height } = useWindowSize();

  const birthdayMessages = [
    "Happy Birthday, Mama! 🎉",
    "You're the best mama in the world! 💖",
    "Thank you for all your love and care! 🌟",
    "Wishing you endless joy and happiness! 🎂",
    "You make every day special! 🌈"
  ];

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % birthdayMessages.length);
    }, 3000);

    const candleTimer = setTimeout(() => {
      setCandleLit(true);
    }, 1000);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(candleTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-hidden relative">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Happy Birthday!
          </h1>
          <motion.h2
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-4xl text-purple-700 font-semibold"
          >
            {birthdayMessages[messageIndex]}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative mb-8"
        >
          <div className="text-8xl md:text-9xl">🎂</div>
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            animate={{ scale: candleLit ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: candleLit ? Infinity : 0 }}
          >
            <div className="text-4xl">🕯️</div>
            {candleLit && (
              <motion.div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-orange-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl"
        >
          <div className="flex justify-center space-x-4 mb-6">
            {['💝', '🌹', '✨', '🎈', '🎁'].map((emoji, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="text-3xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-shadow"
          >
            🎉 More Celebration! 🎉
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-purple-600 font-medium text-lg">
            Made with all my love for you! 💕
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
