import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Anonymous",
    xp: 0,
    level: 1,
    totalQuestions: 0,
    favoriteCategory: "N/A",
  });

  const updateProfile = () => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    if (leaderboard.length === 0) return;

    // Latest player
    const latest = leaderboard[leaderboard.length - 1];
    const playerName = latest.name;

    // All attempts by this player
    const playerEntries = leaderboard.filter(e => e.name === playerName);

    // Total questions attempted
    const totalQuestions = playerEntries.reduce((sum, e) => sum + e.total, 0);

    // Favorite category
    const categoryCount = {};
    playerEntries.forEach(e => {
      const cat = e.category || "N/A";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    const favoriteCategory = Object.keys(categoryCount).reduce(
      (a, b) => (categoryCount[a] >= categoryCount[b] ? a : b),
      "N/A"
    );

    setProfile({
      name: playerName,
      xp: latest.xp,
      level: latest.level,
      totalQuestions,
      favoriteCategory,
    });
  };

  useEffect(() => {
    updateProfile();

    // Listen for changes in localStorage from other tabs or updates
    window.addEventListener("storage", updateProfile);
    return () => window.removeEventListener("storage", updateProfile);
  }, []);

  return (
    <div className="page neon-bg flex flex-col items-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-title neon-text"
      >
        🕹️ {profile.name}'s Cyber Profile
      </motion.h1>

      {/* Avatar */}
      <div className="avatar neon-card mt-6 mb-6 w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold text-cyan-400">
        {profile.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="stats neon-card p-6 rounded-xl flex flex-col items-center gap-3">
        <p>⚡ XP: <span className="highlight">{profile.xp}</span></p>
        <p>🎯 Level: <span className="highlight">{profile.level}</span></p>
        <p>📝 Total Questions: <span className="highlight">{profile.totalQuestions}</span></p>
        <p>🔥 Favorite Category: <span className="highlight">{profile.favoriteCategory}</span></p>

        {/* XP Progress Bar */}
        <div className="xp-bar mt-3 w-full bg-gray-700 h-4 rounded-full">
          <motion.div
            className="xp-fill bg-cyan-400 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(profile.xp % 200) / 2}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <button className="neon-btn mt-6" onClick={() => navigate("/")}>
        🏠 Home
      </button>
    </div>
  );
}
