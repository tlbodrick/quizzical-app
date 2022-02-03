import React from "react"

export default function Triviapage(props) {

    return (
        <div>
            {props.renderTrivia}
            <footer>
                {props.isChecking ?
                    <div className="final-score">
                        {props.isChecking && <p>You scored {props.correctCount}/5 correct answers</p>}
                        <button onClick={props.playAgain}>Play again</button>
                    </div>
                    : <button className="check-answers-btn" onClick={props.checkAnswers}>Check Answers</button>}
            </footer>
        </div>
    )
}


