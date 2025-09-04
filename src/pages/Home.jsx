import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import quizzes from "../data/quizzes";
import "../styles.css";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get unique categories from quizzes
  const categories = [...new Set(quizzes.map(q => q.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter quizzes based on selected categories
  const filteredQuizzes =
    selectedCategories.length === 0
      ? quizzes
      : quizzes.filter(q => selectedCategories.includes(q.category));

  return (
    <div className="home neon-bg relative min-h-screen">
      {/* Hero Section */}
      <header className="hero">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ⚡ QuizArc ⚡
        </motion.h1>
        <p className="hero-sub">Enter the cyber arena. Test your skills.</p>
      </header>

      {/* Category Filter */}
      <div className="category-filter" style={{ textAlign: "center", margin: "1rem 0" ,fontFamily:"Orbitron"}}>
        {categories.map(category => (
          <label key={category} style={{ margin: "0 10px", cursor: "pointer" }}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />{" "}
            {category}
          </label>
        ))}
      </div>

      {/* Quizzes Grid */}
      <motion.div
        className="quiz-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {filteredQuizzes.map((quiz, idx) => (
          <motion.div
            key={quiz.id}
            className={`quiz-card neon-card glow-${idx % 4}`}
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <motion.button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="neon-btn"
            >
              ▶️
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Circular Top-Right Buttons */}
      <div className="top-right-buttons">
        <motion.button onClick={() => navigate("/about")} className="neon-btn">ℹ️</motion.button>
        <motion.button onClick={() => navigate("/leaderboard")} className="neon-btn">🏆</motion.button>
        <motion.button onClick={() => navigate("/profile")} className="neon-btn">👤</motion.button>
      </div>
    </div>
  );
}
