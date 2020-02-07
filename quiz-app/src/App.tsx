import React, { Component } from 'react';
import './App.css';
import { Question } from './components/Question/Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Button} from "react-bootstrap";
import { IQuestion } from './types';
import moment from "moment";
import {AppState} from "./types";
import {Constant} from "./constatnt";

export class  App extends Component<any,AppState>{
  constructor(props: any){
    super(props);
    this.state = {
      isQuizStarted :false,
      currentQuestionNumber: 0,
      questions: [],
      isLoading: true,
      noOfCorrectAnswers: 0,
      startedAt: ""
    }
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderStartQuizButton = this.renderStartQuizButton.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.handleNextEvent = this.handleNextEvent.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.shouldDisplayResult = this.shouldDisplayResult.bind(this);
  }
  componentDidMount(){
    // https://opentdb.com/api.php?amount=3
    axios.get(Constant.API_URL)
    .then(response => {
      const questions = response.data.results.map((question: any) => {
        question.options = question.incorrect_answers.concat(question.correct_answer);
        return question;
      } );
      console.log(questions);
      this.setState({questions, isLoading: false});
    })
    .catch(error => this.setState({isLoading: false}));
  }
  renderQuestion(){
    const question: IQuestion = this.state.questions[this.state.currentQuestionNumber];
    return(
      <Question key={question.question} category={question.category} type={question.type}  question={question.question} handleNextEvent={this.handleNextEvent} 
      correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} options={question.options} difficulty={question.difficulty} questionNo={this.state.currentQuestionNumber + 1} >
      </Question>
    )
  }
  
  renderStartQuizButton(){
    return (
      <div>
        <Button variant="outline-primary" onClick={this.startQuiz}>Start Quiz</Button>
      </div>
    )
  }
  
  startQuiz(){
    const now = moment().format(Constant.DATE_FORMAT);
    this.setState({isQuizStarted: true, startedAt: now});
  }
  renderResult(){
    return (
      <div>
        <div><h2>Result</h2></div>
        <div>Time taken: { moment(moment().format(Constant.DATE_FORMAT)).diff(moment(this.state.startedAt),"minutes")} Minutes</div>
        <div>Score: {this.state.noOfCorrectAnswers}/{this.state.questions.length} </div>
        <div>Percentage: {((this.state.noOfCorrectAnswers/ this.state.questions.length) * 100).toFixed(2)}</div>
      </div>
    )
  }
  handleNextEvent(answer: string){
    const count = this.state.questions[this.state.currentQuestionNumber].correct_answer === answer ? this.state.noOfCorrectAnswers + 1 : this.state.noOfCorrectAnswers;
    this.setState((previousState) => {
      return {currentQuestionNumber: previousState.currentQuestionNumber + 1, noOfCorrectAnswers: count};
    });
  }
  shouldDisplayResult(){
    return this.state.currentQuestionNumber === this.state.questions.length;
  }

  render(){
    return(
      <div className="App">
        <div className="container-fluid">
          {!this.state.isLoading && !this.state.isQuizStarted ? this.renderStartQuizButton(): !this.shouldDisplayResult()  ? this.renderQuestion(): this.state.isQuizStarted ? this.renderResult() : null }
        </div>
      </div>
    )
  }
};

export default App;
