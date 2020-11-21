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

  componentDidMount() {
    this.loadQuiz()
  }


  componentDidUpdate(prevProps, prevState) {
    const {currentIndex} = this.state;   // updated after click currentIndex
    if(this.state.currentIndex !== prevState.currentIndex) {
      // if true loading new q
      this.setState(() => {
        return {
          disabled: true,
          question: QuizData[currentIndex].question,
          options : QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer
        }
      });
    }
  }     // In this case, if the current index changes,
       // then we have to set the question and also disable the options so that user
      // would not be able to select another option.


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


  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }  // Sets the userAnswer state to the option selected by the user and enables next step


  //Responds to the click of the finish button
  finishHandler = () => {
    if(this.state.currentIndex === QuizData.length -1) {
      this.setState({
          quizEnd:true
      })
    }
  }

  render () {
    const {question, options, currentIndex, userAnswer, quizEnd} = this.state
    //get the current state
      if(quizEnd) {
        return (
          <div>
            <h1>Game Over. Final score is {this.state.score} points</h1>
            <p>The correct Answers for the quiz are:</p>
            <ul>
              {QuizData.map((item, index) => (
                <li className='options' key={index}>
                    {item.question} {item.answer}
                </li>
             ))}
            </ul>
          </div>
          )}
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map((option, index) => (  //for each option, new paragraph
          <p key={index}
             className={`options ${userAnswer === option ? "selected" : null}`}
             onClick= {() => this.checkAnswer(option)}>
              {option}
          </p>
        ))}
        {currentIndex < QuizData.length - 1 &&
        // Next button only displays if the above is true
        <button
          className="ui inverted button"
          disabled = {this.state.disabled}
          onClick = {this.nextQuestionHandler}
         >Next Question</button>
        }
        {currentIndex === QuizData.length - 1 &&
        <button
          className="ui inverted button"
          disabled = {this.state.disabled}
          onClick = {this.finishHandler}
        >Finish</button>
        }
      </div>
    )
  }

}

export default Quiz;
