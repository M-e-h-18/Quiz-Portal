// import React from 'react';
// import './about.css';
// import { Link } from 'react-router-dom';

// const About = () => {
//     return (
//         <div>
//             <header>
//                 <nav>
//                     <ul>
//                         {/* <li><a href="home.js">Home</a></li>
//                         <li><a href="about.html">About Us</a></li>
//                         <li><a href="contact.html">Contact</a></li> */}
    
//                <li><a href="/">Home</a></li>
//                             <li><a href="about.js">About Us</a></li>
//                             <li><a href="contact.js">Contact</a></li> 
//                     </ul>
//                 </nav>
//             </header>
//             <main>
//                 <section className="about-section">
//                     <h1>About Us</h1>
//                     <img src="about.jpg" alt="about us"/>
//                     <p className="welcome">Welcome to our quiz site! We are passionate about quizzes and love to challenge your knowledge in various topics. Our quizzes cover a wide range of subjects including:</p>
//                     <ul>
//                         <li>Countries and Capitals</li>
//                         <li>Famous Paintings and Painters</li>
//                         <li>Technological Innovations</li>
//                         <li>Movie Mania</li>
//                         <li>Legends of History</li>
//                     </ul>
//                     <p>Whether you're a history buff, a movie enthusiast, or just looking to test your general knowledge, we have quizzes for everyone!</p>
//                     <p>Feel free to explore our site and challenge yourself with our fun and informative quizzes.</p>
//                 </section>
//             </main>
//             <footer>
//                 <p>&copy; 2024 Quiz Portal. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }

// export default About;
import React, { useState } from 'react';
import './about.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const About = () => {
    const [members, setMembers] = useState([]);

    const fetchMembers = async (category) => {
        try {
            const response = await axios.get(`/api/members/${category}`);
            setMembers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about.js">About Us</Link></li>
                        <li><Link to="/contact.js">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="about-section">
                    <h1>About Us</h1>
                    <section className='about'>
                    <img src="about.jpg" alt="about us"/>

                    <div className="category-buttons">
                        <button onClick={() => fetchMembers('tech_members')}>Tech</button>
                        <button onClick={() => fetchMembers('design_members')}>Design</button>
                        <button onClick={() => fetchMembers('content_members')}>Content</button>
                    </div>
                    <ul className="member-list">
                        {members.map((member, index) => (
                            <li key={index}>
                                <strong>{member.name}</strong><br />
                                {member.role}<br />
                                {member.tech && <span>Tech: {member.tech}</span>}
                                {member.design && <span>Design: {member.design}</span>}
                                {member.content && <span>Content: {member.content}</span>}
                            </li>
                        ))}
                    </ul>
                    </section>
                    
                    <p className="welcome">Welcome to our quiz site! We are passionate about quizzes and love to challenge your knowledge in various topics. Our quizzes cover a wide range of subjects including:</p>
                    <ul>
                        <li>Countries and Capitals</li>
                        <li>Famous Paintings and Painters</li>
                        <li>Technological Innovations</li>
                        <li>Movie Mania</li>
                        <li>Legends of History</li>
                    </ul>
                    <p>Whether you're a history buff, a movie enthusiast, or just looking to test your general knowledge, we have quizzes for everyone!</p>
                    <p>Feel free to explore our site and challenge yourself with our fun and informative quizzes.</p>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Quiz Portal. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default About;


