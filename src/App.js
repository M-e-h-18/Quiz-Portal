import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RouteTransition from "./components/RouteTransition";
import { useState, useEffect } from "react";
// pages
import Home from "./pages/Home";
import TakeQuiz from "./pages/TakeQuiz";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import LoadingScreen from "./components/LoadingScreen";
import Profile from "./pages/Profile";

// inside <Routes>:


function App() {
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to Home on first load
  useEffect(() => {
    if (!loading && firstLoad) {
      navigate("/");       // Force Home route
      setFirstLoad(false); // Only first load
    }
  }, [loading, firstLoad, navigate]);

  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RouteTransition>
              <Home />
            </RouteTransition>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <RouteTransition>
              <TakeQuiz />
            </RouteTransition>
          }
        />
        <Route
          path="/results"
          element={
            <RouteTransition>
              <Results />
            </RouteTransition>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RouteTransition>
              <Leaderboard />
            </RouteTransition>
          }
        />
        <Route
          path="/about"
          element={
            <RouteTransition>
              <About />
            </RouteTransition>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
