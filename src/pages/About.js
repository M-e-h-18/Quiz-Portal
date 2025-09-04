import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="page neon-bg flex flex-col items-center px-6 py-12 relative min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-title neon-text"
      >
        📜 Mission Briefing
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-lg max-w-3xl text-center opacity-80 font-exo"
      >
        Welcome to <span className="highlight">QuizArc</span> ⚡ — a futuristic
        battleground where your knowledge is your ultimate weapon.
        <br />
        <br />
        Take on missions (quizzes), conquer challenges, and rise up the
        leaderboard to prove you are the true cyber-warrior of intellect. 🧠💡
      </motion.p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl w-full">
        {[
          {
            title: "🚀 Epic Missions",
            desc: "Select from a variety of themed quizzes — each a timed challenge that tests your wit and speed.",
          },
          {
            title: "🏆 Leaderboard Glory",
            desc: "Compete with rivals across the neon battlefield. Climb ranks, earn fame, and show your supremacy.",
          },
          {
            title: "⚡ Cyber XP & Levels",
            desc: "Earn XP for every correct answer. Level up, unlock rewards, and watch your neon avatar evolve.",
          },
          {
            title: "🛡️ Lifeline System",
            desc: "Stuck on a tough question? Use your 50-50 Lifeline — only 3 per quiz — to eliminate two wrong options and stay in the fight.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className="neon-card p-6 rounded-xl text-center"
          >
            <h2 className="text-2xl font-orbitron mb-3 neon-text">
              {feature.title}
            </h2>
            <p className="opacity-80 font-exo">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Floating Home Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="neon-btn fixed bottom-6 right-6 shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px #ff00ff, 0 0 50px #ff80ff" }}
        whileTap={{ scale: 0.95 }}
        style={{ zIndex: 1000 }}
      >
        Home
      </motion.button>
    </div>
  );
}
