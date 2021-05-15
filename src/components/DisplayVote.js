import React from 'react'
import { connect } from "react-redux";

function DisplayVote (props) {
    const {answeredQuestions,users,authedUser} = props
    return (
        <div className="displayVote">
            <ul>
            {answeredQuestions.map((question) =>
                <li key={question.id}>
                    <h4>Asked by {users[question.author].name}:</h4>
                    <img src={users[question.author].avatarURL} alt={`Avatar of ${question.author}`}/>
                    <div className="voteResult">
                        Result:
                        <div className="optionOne">
                            Would you rather {question.optionOne.text}
                            {question.optionOne.votes.filter((id) => id === authedUser).length === 1
                             ? "You voted this" : null}
                            Progress Bar from React Bootstrap
                            <br />
                            {question.optionOne.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length}
                        </div>
                        <div className="optionOne">
                            Would you rather {question.optionTwo.text}
                            {question.optionTwo.votes.filter((id) => id === authedUser).length === 1
                             ? "You voted this" : null}
                            Progress Bar from React Bootstrap
                            <br />
                            {question.optionTwo.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length}
                        </div>
                    </div>
                </li>
            )}
            </ul>
        </div>
    )
}

function mapStateToProps ({authedUser, questions, users}) {
    return {
        authedUser, questions, users
    }
}

export default connect(mapStateToProps)(DisplayVote)