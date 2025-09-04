import { useEffect, useState } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onFinish }) {
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM");

  useEffect(() => {
    const messages = [
      "BOOTING QUIZ CORE...",
      "ESTABLISHING NEURAL LINK...",
      "LOADING QUESTIONS...",
      "CALIBRATING LEADERBOARD...",
      "READY TO LAUNCH ⚡"
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[i]);
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
        setTimeout(onFinish, 800); // small delay before app shows
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loading-screen">
      <h1 className="glitch" data-text="⚡ QUIZARC">
        ⚡ QUIZARC
      </h1>
      <p className="loading-text">{loadingText}</p>

      <div className="loading-bar">
        <div className="bar-fill"></div>
      </div>
    </div>
  );
}
