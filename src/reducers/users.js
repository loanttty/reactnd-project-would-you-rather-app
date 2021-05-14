import {RECEIVE_USERS, UPDATE_QUES_CREATED} from "../actions/users"

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
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
        default:
            return state
    }
}