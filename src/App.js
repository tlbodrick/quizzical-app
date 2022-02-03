import React from "react"
import { nanoid } from 'nanoid'
import Start from "./components/Start"
import Question from "./components/Question"
import Button from "./components/Button"
import TriviaPage from "./components/TriviaPage"


export default function App() {

  const [gameStarted, setGameStarted] = React.useState(false);
  const [trivia, setTrivia] = React.useState([]);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [checkingAnswers, setCheckingAnswers] = React.useState(false);


  // start game
  function startQuiz() {
    setGameStarted(true)
  }

  // function to shuffle array 
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // fetch api once game starts
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setTrivia(data.results.map(triviaItem => {
        return {
          question: triviaItem.question,
          correct: triviaItem.correct_answer,
          answers: shuffle([triviaItem.correct_answer, ...triviaItem.incorrect_answers]),
          userChoice: "",
          id: nanoid()
        }
      })))
  }, [gameStarted])


  // render buttons and question on the page
  const renderTrivia = trivia.map(triviaItem => {
    const answerButtons = triviaItem.answers.map((answer, index) => (
      <Button
        isChecking={checkingAnswers}
        key={index}
        value={answer}
        triviaItem={triviaItem}
        clickButton={() => clickButton(triviaItem.id, answer)}
      />
    ))
    return (
      <div className="trivia-item">
        <Question
          value={triviaItem.question}
          key={triviaItem.id}
        />
        {answerButtons}
      </div>
    )
  })

  function clickButton(id, value) {
    const mappedData = trivia.map(triviaItem => (
      triviaItem.id === id ?
        { ...triviaItem, userChoice: value }
        : triviaItem
    )
    )

    setTrivia([...mappedData])

  }

  function checkAnswers() {
    trivia.map(triviaItem => {
      triviaItem.correct === triviaItem.userChoice ?
        setCorrectCount(prevCount => prevCount + 1) : console.log(false)
    })
    setCheckingAnswers(true)

  }


  function playAgain() {
    setGameStarted(false)
    setCheckingAnswers(false)
  }


  return (
    <div className="main-container">
      <main>
        {gameStarted ?
          <TriviaPage
            renderTrivia={renderTrivia}
            checkAnswers={checkAnswers}
            isChecking={checkingAnswers}
            correctCount={correctCount}
            playAgain={playAgain} /> :
          <Start handleClick={startQuiz} />}
      </main>
    </div>
  )
}
