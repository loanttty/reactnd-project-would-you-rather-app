export const RECEIVE_USERS = "RECEIVE_USERS"
export const UPDATE_QUES_CREATED = "UPDATE_QUES_CREATED"
export const UPDATE_QUES_VOTED = "UPDATE_QUES_VOTED"

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
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