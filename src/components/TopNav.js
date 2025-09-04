import { Link, useLocation } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
  const location = useLocation();

  return (
    <header className="topnav glassy-nav">
      {/* Left: Brand / Logo */}
      <div className="topnav-left">
        <Link to="/" className="brand neon-glow">
          ⚡ QuizArc ⚡
        </Link>
      </div>

      {/* Center: Quick Links */}
      <nav className="topnav-center">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link 
          to="/leaderboard" 
          className={`nav-link ${location.pathname === "/leaderboard" ? "active" : ""}`}
        >
          Leaderboard
        </Link>
        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>
      </nav>

      {/* Right: Profile / Notifications */}
      <div className="topnav-right">
        
        <button className="icon-btn profile-btn" title="Profile">
          👤
        </button>
      </div>
    </header>
  );
}
