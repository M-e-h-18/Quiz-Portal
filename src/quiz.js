// Quiz.js
import React from 'react';

function Quiz({ image, title, onClick }) {
    return (
        <div className="quiz">
            <img src={image} alt={title} />
            <p>{title}</p>
            <button onClick={onClick}>Attempt Quiz</button>
        </div>
    );
}

export default Quiz;
