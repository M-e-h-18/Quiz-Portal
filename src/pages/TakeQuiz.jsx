import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizzes from "../data/quizzes";
import { motion } from "framer-motion";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);

  const XP_PER_CORRECT = 50;
  const TIME_PER_QUESTION = 20; // seconds
  const SPEED_BONUS = 20; // extra XP if answered within half time

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [userAnswers, setUserAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [lifelineCount, setLifelineCount] = useState(3);
  const [isTimed, setIsTimed] = useState(null); // null until user chooses

  // Shuffle options for current question
  useEffect(() => {
    if (isTimed === null) return;
    const shuffled = [...quiz.questions[current].options].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setTimeLeft(TIME_PER_QUESTION);
    setLifelineUsed(false);
  }, [current, quiz.questions, isTimed]);

  // Countdown timer (only if timed)
  useEffect(() => {
    if (!isTimed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null); // auto move to next if time runs out
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, isTimed]);

  const handleAnswer = (option) => {
    const correctAnswer = quiz.questions[current].answer;
    const isCorrect = option === correctAnswer;
    let newScore = score;
    let newXp = xp;

    if (isCorrect) {
      newScore += 1;
      newXp += XP_PER_CORRECT;

      if (isTimed && timeLeft >= TIME_PER_QUESTION / 2) newXp += SPEED_BONUS;
    }

    setScore(newScore);
    setXp(newXp);
    setUserAnswers([...userAnswers, option]);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      const level = Math.floor(newXp / 200) + 1;
      const cyberNames = ["NeonWarrior", "CyberWolf", "PixelNinja", "GlitchHunter", "SynthRider"];
      const playerName =
        cyberNames[Math.floor(Math.random() * cyberNames.length)] +
        "#" +
        Math.floor(Math.random() * 999);

      const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboard.push({
        name: playerName,
        score: newScore,
        xp: newXp,
        level,
        total: quiz.questions.length,
        category: quiz.category, // store category
      });
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

      navigate("/results", {
        state: { 
          result: { score: newScore, total: quiz.questions.length, xp: newXp, level }, 
          userAnswers, 
          questions: quiz.questions,
          category: quiz.category,
        }
      });
    }
  };

  const handleLifeline = () => {
    if (lifelineUsed || lifelineCount <= 0) return;

    const correct = quiz.questions[current].answer;
    const wrongOptions = options.filter((opt) => opt !== correct);
    const remove = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);

    setOptions(options.map((opt) => (remove.includes(opt) ? "" : opt)));
    setLifelineUsed(true);
    setLifelineCount((prev) => prev - 1);
  };

  // Render modal for timed choice
  if (isTimed === null) {
    return (
      <div className="page flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-80 text-white">
        <motion.div
          className="p-6 rounded-2xl bg-gray-900 text-center neon-card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-2xl mb-4">Do you want a timed quiz?</h2>
          <div className="flex gap-6 justify-center">
            <motion.button
              className="neon-btn px-6 py-2 rounded-full"
              onClick={() => setIsTimed(true)}
              whileHover={{ scale: 1.1 }}
            >
              Yes ⏱️
            </motion.button>
            <motion.button
              className="neon-btn px-6 py-2 rounded-full"
              onClick={() => setIsTimed(false)}
              whileHover={{ scale: 1.1 }}
            >
              No ❌
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main quiz render
  return (
    <div className="page">
      <h2 className="quiz-title">{quiz.title}</h2>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="question-box"
      >
        <h3>{quiz.questions[current].question}</h3>

        <div className="options">
          {options.map((opt, i) =>
            opt ? (
              <motion.button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="option-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.8, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.05, boxShadow: "0 0 20px #ff00ff, 0 0 30px #00ffe7 inset" }}
                transition={{ delay: i * 0.1 }}
              >
                {opt}
              </motion.button>
            ) : null
          )}
        </div>

        <button
          onClick={handleLifeline}
          disabled={lifelineUsed || lifelineCount <= 0}
          className="neon-btn mt-3"
          style={{ opacity: lifelineUsed || lifelineCount <= 0 ? 0.5 : 1 }}
        >
          50-50 Lifeline ({lifelineCount} left)
        </button>

        {isTimed && <div className="timer neon-text mt-3">⏱️ Time Left: {timeLeft}s</div>}

        <div className="xp-bar mt-4">
          <motion.div
            className="xp-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(xp % 200) / 2}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <p className="xp-text mt-2">⚡ Level {Math.floor(xp / 200) + 1} | {xp} XP</p>
      </motion.div>
    </div>
  );
}

export default TakeQuiz;
