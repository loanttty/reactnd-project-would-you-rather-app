import {ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_VOTING_USER} from "../actions/questions"

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case UPDATE_VOTING_USER:
            const {question,answer} = action
            return {
                ...state,
                [question.id]: {
                    ...state[question.id],
                    [answer]: question[answer]
                }
            }
        default:
            return state
    }
}