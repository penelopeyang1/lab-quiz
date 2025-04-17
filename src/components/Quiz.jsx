// components/Quiz.jsx
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "../data/questions";
import { results } from "../data/results";
import Lottie from "lottie-react";
import successAnim from "../assets/successfully-done.json";
import Confetti from "react-confetti";

import imgA from "../assets/blood-analysis.png";
import imgB from "../assets/wellness-program.png";
import imgC from "../assets/diet.png";
import imgD from "../assets/hormone.png";
import imgE from "../assets/medical-report.png";
// import imgF from '../assets/blood-drop-tube.png';

import imgQ1 from "../assets/look-tube.png";
import imgQ2 from "../assets/target.png";
import imgQ3 from "../assets/stress-management.png";
import imgQ4 from "../assets/question-mark.png";
import imgQ5 from "../assets/decision-making.png";


function Quiz({ onRestart }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const timeoutRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [fadeConfetti, setFadeConfetti] = useState(false);

  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  const questionImages = [imgQ1, imgQ2, imgQ3, imgQ4, imgQ5];

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [animationDone]);

  useEffect(() => {
    if (animationDone) {
      const fadeTimer = setTimeout(() => setFadeConfetti(true), 1500);
      const removeTimer = setTimeout(() => setShowConfetti(false), 2500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [animationDone]);

  const resetQuiz = () => {
    setTimeout(() => {
      if (onRestart) onRestart();
    }, 400);
  };

  const handleAnswer = (value) => {
    clearTimeout(timeoutRef.current);
    setAnswers([...answers, value]);
    setCurrentQ(currentQ + 1);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      resetQuiz();
    }, 180000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentQ]);

  const calculateResult = () => {
    const tally = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const topAnswer = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
    return results[topAnswer];
  };

  const getImageForResult = (key) => {
    switch (key) {
      case "A": return imgA;
      case "B": return imgB;
      case "C": return imgC;
      case "D": return imgD;
      case "E": return imgE;
      default: return null;
    }
  };

  if (currentQ >= questions.length) {
    const result = calculateResult();
    const resultImage = getImageForResult(result.key);

    return (
      <motion.div
        ref={cardRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center relative overflow-hidden rounded-3xl"
      >
        {!animationDone && (
          <div className="w-40 mx-auto mb-4">
            <Lottie
              key="lottie-success"
              animationData={successAnim}
              loop={false}
              onComplete={() => setAnimationDone(true)}
            />
          </div>
        )}

        {animationDone && resultImage && (
          <>
            <motion.img
              src={resultImage}
              alt="Result Visual"
              className="w-32 h-32 mx-auto mb-4 mt-6 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            {showConfetti && (
              <div
                className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${
                  fadeConfetti ? "opacity-0" : "opacity-100"
                }`}
              >
                <Confetti
                  width={cardWidth}
                  height={cardHeight}
                  numberOfPieces={250}
                  gravity={0.5}
                  recycle={false}
                />
              </div>
            )}
          </>
        )}

        <h2 className="text-2xl font-bold text-primary font-heading mb-4">{result.title}</h2>
        <p className="text-base text-text font-body mb-6 mt-6">{result.description}</p>

        <motion.button
            onClick={resetQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 mb-6 px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-blue-500 hover:to-green-400 text-white font-medium rounded-full transition font-body"
            >
            Start Over
            </motion.button>
      </motion.div>
    );
  }

  const current = questions[currentQ];

  return (
    <motion.div
      key={currentQ}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-text font-heading mb-10 mt-8">
        {current.question}
        </h2>
        <img
            src={questionImages[currentQ]}
            alt="Question Visual"
            className="w-[100px] h-[100px] mx-auto mb-10 mt-8"
        />

      {/* <div className="space-y-2">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.value)}
            className="w-full px-4 py-2 bg-accent hover:bg-secondary text-text rounded-lg transition font-body text-base"
          >
            {opt.text}
          </button>
        ))}
      </div> */}
      <div className="flex justify-center">
        <div className="space-y-2 w-full max-w-md mb-6">
            {current.options.map((opt, idx) => (
            <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="w-full px-4 py-2 bg-accent hover:bg-secondary text-text rounded-lg transition font-body text-base pt-4 pb-4"
            >
                {opt.text}
            </button>
            ))}
        </div>
        </div>
    </motion.div>
  );
}

export default Quiz;