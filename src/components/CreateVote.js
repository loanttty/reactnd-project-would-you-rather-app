import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import {handleVoteUpdating} from "../actions/questions"

class CreateVote extends Component {
    state = {
        selectedOption: '',
        questionId: '',
        toHome: false
    }

    handleVote = (e) => {
        this.setState({
            selectedOption:e.target.value,
            questionId: e.target.id,
            toHome: false})
    }

    updateVote = (e) => {
        e.preventDefault()
        const {selectedOption,questionId} = this.state
        
        this.props.dispatch(handleVoteUpdating({
            questionId,
            answer: selectedOption}))
        
        this.setState({toHome: true})
    }

    render() {
        const {authedUser,users,question} = this.props
        const {toHome} = this.state
        if (toHome === true) {
            return <Redirect to="/" />
        }
        if (question.length !== 0) {
            const unansweredCheck = users[authedUser].answers[question[0].id]
            return (
                <div className="question">
                    {unansweredCheck === undefined
                    ? <div className="unanswered">
                        <h4>{users[question[0].author].name} asks</h4>
                        <img src={users[question[0].author].avatarURL} alt={`Avatar of ${question[0].author}`}/>
                        <form onSubmit={this.updateVote}>
                            Would you rather...
                            <br />
                            <input type="radio" id={question[0].id}
                                    value="optionOne"
                                    name="option"
                                    onChange={this.handleVote}/>
                            {question[0].optionOne.text}
                            <br/>
                            <input type="radio" id={question[0].id} 
                                    value="optionTwo"
                                    name="option"
                                    onChange={this.handleVote}/>
                            {question[0].optionTwo.text}
                            <br/>
                            <button type="submit" className="btn">Submit</button>
                        </form>
                    </div>
                    : <div className="answered">
                            <h4>Asked by {users[question[0].author].name}:</h4>
                            <img src={users[question[0].author].avatarURL} alt={`Avatar of ${question[0].author}`}/>
                            <div className="voteResult">
                                Result:
                                <div className="optionOne">
                                    Would you rather {question[0].optionOne.text}
                                    {question[0].optionOne.votes.filter((id) => id === authedUser).length === 1
                                    ? "You voted this" : null}
                                    Progress Bar from React Bootstrap
                                    <br />
                                    {question[0].optionOne.votes.length} out of {question[0].optionOne.votes.length + question[0].optionTwo.votes.length}
                                </div>
                                <div className="optionOne">
                                    Would you rather {question[0].optionTwo.text}
                                    {question[0].optionTwo.votes.filter((id) => id === authedUser).length === 1
                                    ? "You voted this" : null}
                                    Progress Bar from React Bootstrap
                                    <br />
                                    {question[0].optionTwo.votes.length} out of {question[0].optionOne.votes.length + question[0].optionTwo.votes.length}
                                </div>
                            </div>
                    </div>
                    }
                </div>)
        } else {
            return null
        }
    }
}

function mapStateToProps ({authedUser,users,questions},props) {
    const {id} = props.match.params
    return {
        authedUser,
        users,
        question: Object.values(questions).filter((question) => question.id === id)
    }
}

export default connect(mapStateToProps)(CreateVote)