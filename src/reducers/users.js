import {ADD_USER, RECEIVE_USERS, UPDATE_QUES_CREATED, UPDATE_QUES_VOTED} from "../actions/users"

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        case UPDATE_QUES_CREATED:
            const {user} = action
            return {
                ...state,
                [user.id]: {
                ...user,
                questions: user.questions
                }
            }
        case UPDATE_QUES_VOTED:
            const {userWithQuestionVoted} = action
            return {
                ...state,
                [userWithQuestionVoted.id]: {
                ...userWithQuestionVoted,
                answers: userWithQuestionVoted.answers
                }
            }
        default:
            return state
    }
}