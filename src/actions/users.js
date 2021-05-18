import { _saveNewUser } from "../utils/_DATA"

export const RECEIVE_USERS = "RECEIVE_USERS"
export const ADD_USER = "ADD_USER"
export const UPDATE_QUES_CREATED = "UPDATE_QUES_CREATED"
export const UPDATE_QUES_VOTED = "UPDATE_QUES_VOTED"

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}
function addUser (user) {
    return {
        type: ADD_USER,
        user
    }
}
export function handleAddUser (id, name, avatarURL) {
    return (dispatch) => {
        return _saveNewUser({id, name, avatarURL})
                .then((user) => dispatch(addUser(user)))
    }
}
export function updateQuestionCreated (user) {
    return {
        type: UPDATE_QUES_CREATED,
        user
    }
}
export function updateQuestionVoted (userWithQuestionVoted) {
    return {
        type: UPDATE_QUES_VOTED,
        userWithQuestionVoted
    }
}