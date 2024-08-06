import React from 'react';
import './homestyle.css'; 


class QuizPortal extends React.Component {
    startQuiz1() {
        
        window.location.href = 'miniprojcapitalssstart1.html';
    }

    startQuiz2() {
        
        window.location.href = 'miniprojpaintingssstart.html';
    }

    startQuiz3() {
        
        window.location.href = 'miniprojtechssstart.html';
    }

    startQuiz4() {
            window.location.href = 'miniprojmoviessstart.html';
    }

    startQuiz5() {
            window.location.href = 'miniprojhistorysstart.html';
    }

    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                             <li><a href="/">Home</a></li>
                            <li><a href="about.js">About Us</a></li>
                            <li><a href="contact.js">Contact</a></li> 
                        </ul>
                    </nav>
                </header>
                <main>
                    <section className="hero">
                        <h1>Welcome to the Online Quiz!</h1>
                    </section>
                    <section className="featured-quizzes">
                        <div className="quiz-container">
                            <div className="quiz">
                                <img src="quiz1.jpeg" alt="Quiz 1" />
                                <p class="head">Countries and Capitals</p>
                                <button onClick={this.startQuiz1}>Attempt Quiz</button>
                            </div>
                            <div className="quiz">
                                <img src="quiz2.jpeg" alt="Quiz 2" />
                                <p class="head">Famous Paintings and Painters</p>
                                <button onClick={this.startQuiz2}>Attempt Quiz</button>
                            </div>
                            <div className="quiz">
                                <img src="quiz3.jpeg" alt="Quiz 3" />
                                <p class="head">Technological Innovations</p>
                                <button onClick={this.startQuiz3}>Attempt Quiz</button>
                            </div>
                            <div className="quiz">
                                <img src="quiz4.png" alt="Quiz 4" />
                                <p class="head">Movie Mania</p>
                                <button onClick={this.startQuiz4}>Attempt Quiz</button>
                            </div>
                            <div className="quiz">
                                <img src="quiz5.jpeg" alt="Quiz 5" />
                                <p class="head">Legends of History</p>
                                <button onClick={this.startQuiz5}>Attempt Quiz</button>
                            </div>
                        </div>
                    </section>
                </main>
                <footer>
                    <p>&copy; 2024 Quiz Portal. All rights reserved.</p>
                </footer>
            </div>
        );
    }
}

export default QuizPortal;
