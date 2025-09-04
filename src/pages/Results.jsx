import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const userAnswers = location.state?.userAnswers;
  const questions = location.state?.questions;

  if (!result) {
    return (
      <div className="page neon-bg flex flex-col items-center justify-center">
        <h2 className="hero-title">⚠️ No Results Found</h2>
        <button onClick={() => navigate("/")} className="neon-btn mt-6">
          Go Back Home
        </button>
      </div>
    );
  }

  const { score, total, xp, level } = result;
  const percentage = Math.round((score / total) * 100);
  const victory = percentage >= 50;

  // Badges
  const badges = [];
  if (score === total) badges.push("🌟 Perfect Score");
  if (score === 0) badges.push("💀 Try Again");
  if (percentage >= 80) badges.push("🔥 Sharp Shooter");
  if (percentage < 50) badges.push("📚 Needs Practice");
  if (xp >= 100) badges.push("⚡ XP Hunter");
  if (level >= 5) badges.push("🎯 Pro Player");

  // Level-Up Neon Flash
  useEffect(() => {
    document.body.classList.add("level-up-flash");
    const timer = setTimeout(() => document.body.classList.remove("level-up-flash"), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page neon-bg flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="neon-card result-box text-center"
      >
        <h1 className={`result-title ${victory ? "text-green" : "text-pink"}`}>
          {victory ? "🏆 Victory!" : "💀 Defeat!"}
        </h1>

        <p className="score-text">
          You scored <span className="highlight">{score}</span> out of{" "}
          <span className="highlight">{total}</span>
        </p>

        <div className="progress mt-6">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <p className="percentage neon-text">{percentage}%</p>

        <div className="xp-section mt-6">
          <p className="xp-text">
            ⚡ XP Gained: <span className="highlight">{xp}</span>
          </p>
          <p className="xp-text">
            🎯 Level: <span className="highlight">{level}</span>
          </p>

          <div className="xp-bar mt-3">
            <motion.div
              className="xp-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(xp % 200) / 2}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
        </div>

        {/* Question Review */}
        {userAnswers && questions && (
          <div className="review-section mt-6 w-full max-w-3xl">
            <h3 className="neon-text mb-4">📝 Question Review</h3>
            {userAnswers.map((ua, idx) => (
              <div key={idx} className="review-question neon-card p-3 mb-3">
                <p>{questions[idx].question}</p>
                <p>
                  Your answer:{" "}
                  <span className={ua === questions[idx].answer ? "text-green" : "text-pink"}>
                    {ua || "Skipped"}
                  </span>
                </p>
                {ua !== questions[idx].answer && <p>Correct: {questions[idx].answer}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="badges-section mt-8">
            <h3 className="neon-text text-lg mb-4">🏅 Achievements Unlocked</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="badge px-4 py-2 rounded-lg border border-cyan-400/40 neon-text text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6 mt-8">
          <button onClick={() => navigate("/")} className="neon-btn">
            Home
          </button>
          <button onClick={() => navigate("/leaderboard")} className="neon-btn">
            Leaderboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
