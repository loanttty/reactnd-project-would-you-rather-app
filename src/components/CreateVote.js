import React, { Component } from 'react'
import { connect } from "react-redux";
import {handleVoteUpdating} from "../actions/questions"
import DisplayVote from './DisplayVote';
import "./CreateVote.css"
import {Row, Col} from "react-bootstrap"

class CreateVote extends Component {
    state = {
        selectedOption: '',
        questionId: '',
    }

    handleVote = (e) => {
        this.setState({
            selectedOption:e.target.value,
            questionId: e.target.id,
        })
    }

    updateVote = (e) => {
        e.preventDefault()
        const {selectedOption,questionId} = this.state
        
        this.props.dispatch(handleVoteUpdating({
            questionId,
            answer: selectedOption}))
        
    }

    render() {
        const {authedUser,users,question} = this.props

        if (question.length !== 0) {
            const unansweredCheck = users[authedUser].answers[question[0].id]
            return (
                <div>
                    {unansweredCheck === undefined
                    ? <div className="unanswered">
                        <Row sx={6} style={{borderBottom: "0.01em solid #dad7d7", margin: "5px"}}>
                            <h3 style={{textAlign: "left", margin: "5px"}}>{users[question[0].author].name} asks</h3>
                        </Row>
                        <Row>
                            <Col sm={4} style={{textAlign: "center"}}>
                                <img src={users[question[0].author].avatarURL} alt={`Avatar of ${question[0].author}`} className="avatar"/>
                            </Col>
                            <Col sm={8}>
                                <form onSubmit={this.updateVote}>
                                    <h4 style={{textAlign: "left"}}>Would you rather...</h4>
                                    <input type="radio" id={question[0].id}
                                            value="optionOne"
                                            name="option"
                                            onChange={this.handleVote}/>
                                    <span>{question[0].optionOne.text}</span>
                                    <br/>
                                    <input type="radio" id={question[0].id} 
                                            value="optionTwo"
                                            name="option"
                                            onChange={this.handleVote}/>
                                    <span>{question[0].optionTwo.text}</span>
                                    <br/>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </Col>
                        </Row>
                    </div>
                    : <DisplayVote userName={users[question[0].author].name}
                                   userAvatar={users[question[0].author].avatarURL}
                                   userId={question[0].author}
                                   authedUser={authedUser}
                                   votesOptionOne={question[0].optionOne.votes}
                                   optionOneText={question[0].optionOne.text}
                                   votesOptionTwo={question[0].optionTwo.votes} 
                                   optionTwoText={question[0].optionTwo.text} />
                    }
                </div>)
        } else {
            return <h4>Question does not exist.</h4>
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