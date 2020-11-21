import React, { Component } from 'react';
import QuizData from '../QuizData'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAnswer: null,    //current users answer
      currentIndex: 0,  //current questions index
      options: [],       //the four options
      quizEnd: false, //True if it's the last question
      score: 0,      //the Score
      disabled: true  // disables before selecting one answer
    }
  }

  loadQuiz =() => {
    const {currentIndex} = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      }
    })
  }   // This function simply sets a question based on the current index


  //Handles Click event for the next button
  nextQuestionHandler = () => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    } //Check for correct answer and increment score

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null
    })
  }

  componentDidMount() {
    this.loadQuiz()
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  render () {
    return (
      <div>
        <p>
          {this.state.question}
        </p>
      </div>
    )
  }

}

export default Quiz;
