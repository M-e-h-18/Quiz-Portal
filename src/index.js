import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuizPortal from './quizportal';
import Home from './home.js';
import About from './about';
import Contact from './contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<QuizPortal />} />
        
        <Route path="/home.js" element={<Home />} />
        <Route path="/about.js" element={<About />} />
        <Route path="/contact.js" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);