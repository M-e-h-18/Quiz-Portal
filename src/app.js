// App.js
import React, { useState } from 'react';
import QuizPortal from './quizportal';
import About from './about';
import Contact from './contact';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const navigateTo = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><button onClick={() => navigateTo('home')}>Home</button></li>
                        <li><button onClick={() => navigateTo('about')}>About Us</button></li>
                        <li><button onClick={() => navigateTo('contact')}>Contact</button></li>
                    </ul>
                </nav>
            </header>
            <main>
                {currentPage === 'home' && <QuizPortal />}
                {currentPage === 'about' && <About />}
                {currentPage === 'contact' && <Contact />}
            </main>
            <footer>
                <p>&copy; 2024 Quiz Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
