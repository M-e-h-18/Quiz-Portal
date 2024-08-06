import React from 'react';
import './homestyle.css';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div>
      <header>
        <h1><img src="contact.png" alt="contact us"/></h1>
        <nav>
          <ul>
             <li><a href="/">Home</a></li>
                            <li><a href="about.js">About Us</a></li>
                            <li><a href="contact.js">Contact</a></li> 
          </ul>
        </nav>
      </header>
      <main>
        <section className="contact">
          <h3>Have a question or feedback? We'd love to hear from you!</h3>
          <form action="#" method="POST">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Quiz Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
