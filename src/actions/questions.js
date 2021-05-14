import { _saveQuestion } from "../utils/_DATA"
import { updateQuestionCreated } from "./users"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (optionOne,optionTwo) {
    return (dispatch,getState) => {
        const {authedUser} = getState()
        
        return _saveQuestion({
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authedUser})
                .then(({formattedQuestion,users}) => {
                    dispatch(updateQuestionCreated(users[authedUser]))
                    dispatch(addQuestion(formattedQuestion))
                })
    }
}