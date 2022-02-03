import React from "react"

export default function Questions(props) {
    return (
        <div className="question-container">
            <p className="question" dangerouslySetInnerHTML={{ __html: props.value }} />
        </div>
    )
}