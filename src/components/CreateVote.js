import React, { Component } from 'react'
import { connect } from "react-redux";
import {handleVoteUpdating} from "../actions/questions"

class CreateVote extends Component {
    state = {
        selectedOption: '',
        questionId: ''
    }

    handleVote = (e) => {
        this.setState({
            selectedOption:e.target.value,
            questionId: e.target.id})
    }

    updateVote = (e) => {
        e.preventDefault()
        const {selectedOption,questionId} = this.state
        console.log(this.state.selectedOption)
        this.props.dispatch(handleVoteUpdating({
            questionId,
            answer: selectedOption}))
    }

    render() {
        const {authedUser,users,questions} = this.props
        const {unansweredQuestions, answeredquestions} = this.props
        console.log(this.props.unansweredQuestions)
        return (
            <div className="question">
                <ul>
                    {unansweredQuestions.map((question) =>
                        <li key={question.id}>
                            <h4>{users[question.author].name}asks</h4>
                            <img src={users[question.author].avatarURL} alt={`Avatar of ${question.author}`}/>
                            <form onSubmit={this.updateVote}>
                                Would you rather...
                                <br />
                                <input type="radio" id={question.id}
                                value="optionOne"
                                name="option"
                                onChange={this.handleVote}/>
                                {question.optionOne.text}
                                <br/>
                                <input type="radio" id={question.id} 
                                value="optionTwo"
                                name="option"
                                onChange={this.handleVote}/>
                                {question.optionTwo.text}
                                <br/>
                                <button type="submit" className="btn">Submit</button>
                            </form>
                        </li>
                    )}
                    </ul>
            </div>
        )
    }
}

function mapStateToProps ({authedUser,users,questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(CreateVote)