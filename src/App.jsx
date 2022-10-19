import { useState, useEffect } from 'react'
import Question from './components/Question'
import PlayGame from './components/PlayGame'
import random from './assets/utils'
import {ThreeDots } from 'react-loader-spinner'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questionData, setQuestionData] = useState([])
  const [isEnded, setIsEnded] = useState(false)
  const [result, setResult] = useState(0)
  const [newGame, setNewGame] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(function(){
    setIsLoading(true)
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(data => {
      let dataarray = data.results
      setQuestionData(dataarray.map(
        (e,index) => (
          {id: index+1,
          qs: e.question,
          answer: random([...e.incorrect_answers.map((e,index)=> (
            {id: index+1, choice: e, isCorrect: false, isSelected: false})),
            {id: 4, choice: e.correct_answer, isCorrect: true, isSelected: false}])})))
      setIsLoading(false)
      })

  },[newGame])

  function selectChoice(qs,qsId) {
    if (!isEnded) {
      setQuestionData(prev => prev.map(e => {
      return e.id===qs? {...e,answer:e.answer.map(ele => (ele.id===qsId? {...ele, isSelected: !ele.isSelected} : {...ele, isSelected:false})) } : e}))
    }
    

  }


  let renderquestions = questionData.map((e,index) => (<Question key={index} item={e} handleClick={selectChoice} end={isEnded} />))
  
  function startGmae() {
    setIsStarted(!isStarted)
    setResult(0)
  }

  function endGame() {
    setIsEnded(true)
    questionData.forEach(qs => qs.answer.forEach(choice => {
      if (choice.isCorrect && choice.isSelected) {
        setResult(prev => prev+1)
      }
    }))

  }

  function newGmaeFunc() {
    setResult(0)
    setNewGame(!newGame)
    setIsEnded(!isEnded)
  }




  return (
  isStarted? 
    <main> 
    {isLoading? <div className='results-container'> <ThreeDots 
    height="80" 
    width="100" 
    radius="9" 
    color="#293264" 
    ariaLabel="three-dots-loading" 
    wrapperStyle={{}} 
    wrapperClassName="" 
    visible={true} /> </div>
    : renderquestions}
    <div className='results-container' >
      {isEnded && <p className='result-caption' >You scored {result}/5 correct answers! </p>}
      <button onClick={isEnded? newGmaeFunc : endGame }>{isEnded? 'Play Again' : 'Check answers'}</button>
    </div>
 
    </main> : 
    <PlayGame handleClick={startGmae} />
  )
}

export default App
