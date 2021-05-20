import React from 'react'
import "./DisplayVote.css"
import {Row, Col, ProgressBar} from "react-bootstrap"

export default function DisplayVote (props) {
    const {userName, 
           userAvatar, 
           userId, 
           authedUser, 
           votesOptionOne, 
           optionOneText, 
           votesOptionTwo,
           optionTwoText} = props
    const totalVotes = votesOptionOne.length + votesOptionTwo.length
    const optionOnePercentage = Math.round(votesOptionOne.length / totalVotes * 100)
    const optionTwoPercentage = Math.round(votesOptionTwo.length / totalVotes * 100)
    return (
        <div className="answered">
            <Row sx={6}>
                <h3 style={{textAlign: "left", margin: "10px 5px"}}>Asked by {userName}:</h3>
            </Row>
            <Row>
                <Col sm={3} style={{textAlign: "center",borderRight: "0.01em dotted #dad7d7"}}>
                    <img src={userAvatar} alt={`Avatar of ${userId}`} className="avatar"/>
                </Col>
                <Col sm={9} className="voteResult">
                    <h4 style={{textAlign: "left"}}>Result:</h4>
                    <Row>
                        <Col sm={5} className="optionDisplay">
                            <span>Would you rather {optionOneText}</span>
                            <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`}/>
                            <span><strong>{votesOptionOne.length}</strong> out of <strong>{totalVotes}</strong></span>
                            {votesOptionOne.filter((id) => id === authedUser).length === 1
                                ? <span><i className="fas fa-check-circle youVoteOne"></i></span> 
                                : null}
                        </Col>
                        <Col sm={5} className="optionDisplay">
                            <span>Would you rather {optionTwoText}</span>
                            <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                            <span><strong>{votesOptionTwo.length}</strong> out of <strong>{totalVotes}</strong></span>
                            {votesOptionTwo.filter((id) => id === authedUser).length === 1
                            ? <span><i className="fas fa-check-circle youVoteTwo"></i></span> 
                            : null}
                    </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
