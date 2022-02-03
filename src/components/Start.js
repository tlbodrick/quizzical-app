import React from "react"

export default function Start(props) {
    return (
        <div className="start-container">
            <h1>Quizzical</h1>
            <p className="quiz-description">Reading to test your knowledge?</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}