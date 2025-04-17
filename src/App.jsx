// App.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Quiz from "./components/Quiz";
import logo from "./assets/full-altn-logo.png";
// import imgF from './assets/blood-drop-tube.png';
import imgG from './assets/tube.png'

function App() {
  const [started, setStarted] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-[#e4f0ff] px-10 overflow-hidden">
      {/* 🎨 Enhanced gradient backdrop for glass effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#d6e6ff] via-[#c0dbff] to-[#e4f0ff]" />

      {/* 🔵 More vivid background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-accent/50 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-primary/50 rounded-full blur-3xl z-0" />

      {/* 🌟 Logo above the card */}
      <img
        src={logo}
        alt="Logo"
        className="w-44 sm:w-52 h-auto max-w-none object-contain mt-2 mb-4 z-20"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl px-6 sm:px-12 pt-6 pb-10 mb-12
                   bg-white/30 backdrop-blur-2xl
                   border border-white/20
                   rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={started ? 'quiz' : 'intro'}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!started ? (
              <div className="text-center">
                <h1 className="text-4xl font-bold text-primary font-heading mb-6 mt-6">
                  <span className="text-gradient italic animate-gradient-x">What Lab Test Are You?</span>
                </h1>
                <img
                  src={imgG}
                  alt="Blood drop and test tube"
                  className="w-20 h-20 mx-auto mb-6"
                />
                <h3 className='text-xl text-text font-body mb-6'>
                  <span className="text-text">Answer these 5 quick questions to discover which panel might help you understand your health better!
                  </span></h3>
                <motion.button
                  onClick={() => setStarted(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 mb-6 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md transition font-body bg-gradient-to-r from-primary to-accent hover:from-blue-500 hover:to-green-400"
                >
                  Start
                </motion.button>
              </div>
            ) : (
              <Quiz onRestart={() => setStarted(false)} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default App;

