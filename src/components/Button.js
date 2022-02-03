import React from "react"

export default function Button(props) {

    let styling = {}
    if (props.isChecking) {
        if (props.value === props.triviaItem.correct) {
            styling = { backgroundColor: "#94D7A2", border: "none" }
        } else if (props.triviaItem.userChoice !== props.triviaItem.correct && props.triviaItem.userChoice === props.value) {
            styling = { backgroundColor: "#F8BCBC", border: "none", color: "#293264", opacity: "50%" }
        }
    } else if (props.triviaItem.userChoice === props.value) {
        styling = { backgroundColor: "#D6DBF5" }
    }





    return (
        <div className="trivia-options">
            <button
                onClick={props.clickButton}
                className="option"
                style={styling}
            >
                {props.value}
            </button>
        </div>


    )
}

