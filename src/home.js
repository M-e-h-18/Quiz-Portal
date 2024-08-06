// components/Home.js

import React from 'react';
import './homestyle.css';

function Home() {
  return (
    <section className="hero">
      <h1>Welcome to the Online Quiz!</h1>
      <div className="featured-quizzes">
        <div className="quiz-container">
          <div className="quiz">
            <img src="/quiz1.jpeg" alt="Quiz 1" />
            <p>Countries and Capitals</p>
            <button onClick={() => startQuiz1()}>Attempt Quiz</button>
          </div>
          <div className="quiz">
            <img src="/quiz2.jpeg" alt="Quiz 2" />
            <p>Famous Paintings and Painters</p>
            <button onClick={() => startQuiz2()}>Attempt Quiz</button>
          </div>
          <div className="quiz">
            <img src="/quiz3.jpeg" alt="Quiz 3" />
            <p>Technological Innovations</p>
            <button onClick={() => startQuiz3()}>Attempt Quiz</button>
          </div>
          <div className="quiz">
            <img src="/quiz4.jpeg" alt="Quiz 4" />
            <p>Movie Mania</p>
            <button onClick={() => startQuiz4()}>Attempt Quiz</button>
          </div>
          <div className="quiz">
            <img src="/quiz5.jpeg" alt="Quiz 5" />
            <p>Legends of History</p>
            <button onClick={() => startQuiz5()}>Attempt Quiz</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function startQuiz1() {
  window.location.href = 'miniprojcapitalssstart1.html';
}

function startQuiz2() {
  window.location.href = 'miniprojpaintingssstart.html';
}

function startQuiz3() {
  window.location.href = 'miniprojtechssstart.html';
}

function startQuiz4() {
  window.location.href = 'miniprojmoviessstart.html';
}

function startQuiz5() {
  window.location.href = 'miniprojhistorysstart.html';
}

export default Home;
