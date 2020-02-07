import {IQuestionProp } from "../../types";
import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
export const Question: React.FC<IQuestionProp> = ({category,type,question,correct_answer,incorrect_answers, options, handleNextEvent, questionNo}) => {
    const [state, markAsGiven,]= useState({
        isAnswerGiven: false,
        currentAnswer: ""
    });
    return (
        <div className="question">
            <div className="questionTitle">#{questionNo} {question}</div>
                {
                    options.map((option: string) => {
                        return (
                            <div>
                                <Form.Check
                                key={option}
                                checked={state.currentAnswer === option}
                                value={option}
                                type="radio"
                                label={option}
                                id={option}
                                onChange={() => markAsGiven({currentAnswer: option, isAnswerGiven: true})}
                            />
                            </div>
                        )
                    })
                }
             <Button variant="outline-primary" disabled={!state.isAnswerGiven} onClick={() => handleNextEvent(state.currentAnswer)}>Next</Button>   
        </div>
    )
}