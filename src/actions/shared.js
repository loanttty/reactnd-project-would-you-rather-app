import {receiveQuestions} from "./questions"
import {receiveUsers} from "./users"
//import {setAuthedUser} from "./authedUser"
import {_getQuestions, _getUsers} from "../utils/_DATA"

//const AUTHED_ID = "sarahedo"

export function handleInitialUpdateStoreQuestions () {
    return (dispatch) => {
        return _getQuestions()
                .then((questions) => dispatch(receiveQuestions(questions)))
    }
}
export function handleInitialUpdateStoreUsers () {
    return (dispatch) => {
        return _getUsers()
                .then((users) => dispatch(receiveUsers(users)))
    }
}
/*export function handleInitialUpdateStoreAuthedUser (id) {
    return (dispatch) => dispatch(setAuthedUser(id))
}*/
