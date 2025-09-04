import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  // Load & sort leaderboard
  const loadLeaderboard = () => {
    const stored = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const sorted = stored
      .sort((a, b) => b.score - a.score || b.xp - a.xp)
      .slice(0, 10);
    setLeaderboard(sorted);
  };

  useEffect(() => {
    loadLeaderboard();
    window.addEventListener("storage", loadLeaderboard);
    return () => window.removeEventListener("storage", loadLeaderboard);
  }, []);

  return (
    <div className="page neon-bg flex flex-col items-center justify-start px-4 py-10 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-title neon-text mb-6"
      >
        🏆 Leaderboard
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="neon-btn mb-8"
      >
        ⬅️ Back to Home
      </motion.button>

      {leaderboard.length === 0 ? (
        <p className="mt-6 text-lg opacity-75">No scores yet... 👀</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="leaderboard-box neon-card w-full max-w-3xl p-6"
        >
          <table className="leaderboard-table w-full text-center">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>XP</th>
                <th>Level</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${
                    i === 0
                      ? "text-yellow-400"
                      : i === 1
                      ? "text-gray-400"
                      : i === 2
                      ? "text-orange-400"
                      : ""
                  }`}
                >
                  <td className="rank">
                    {i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </td>
                  <td>{entry.name}</td>
                  <td>{entry.score} / {entry.total}</td>
                  <td>{entry.xp}</td>
                  <td>{entry.level}</td>
                  <td>{entry.category}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
