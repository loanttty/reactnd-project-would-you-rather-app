import { _saveQuestion,_saveQuestionAnswer } from "../utils/_DATA"
import { updateQuestionCreated, updateQuestionVoted } from "./users"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const UPDATE_VOTING_USER = "UPDATE_VOTING_USER"

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

function updateVotingUser ({question,answer}) {
    return {
        type: UPDATE_VOTING_USER,
        question,
        answer
    }
}

export function handleVoteUpdating ({questionId, answer}) { //answer is either optionOne or optionTwo
    return (dispatch,getState) => {
        const {authedUser} = getState()
        return _saveQuestionAnswer ({ 
            authedUser, 
            qid:questionId, 
            answer })
                .then(({questions,users}) => {
                    dispatch(updateQuestionVoted(users[authedUser]))
                    dispatch(updateVotingUser({question:questions[questionId],answer}))
                })
    }
}