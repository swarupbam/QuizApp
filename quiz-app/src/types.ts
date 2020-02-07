export interface IQuestion{
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    options: string[]
}
export interface IQuestionProp extends IQuestion{
    handleNextEvent(currentAnswer: string): void,
    questionNo: number
}

export interface AppState{
    isQuizStarted: boolean,
    currentQuestionNumber: number,
    questions: IQuestion [],
    isLoading: boolean,
    noOfCorrectAnswers: number,
    startedAt: string
  }
