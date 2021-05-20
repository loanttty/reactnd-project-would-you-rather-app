import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, withRouter} from 'react-router-dom'  
import "./DisplayQuestions.css"


class DisplayQuestion extends Component {
    render() {
        const {question, users} = this.props
        return (
            <div className="questionNotInFull">
                <img src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].name}`}
                    className="avatar"/>
                <div className="question">
                    <h4>Would you rather</h4>
                    <div className="optionText">...{question.optionOne.text}...</div>
                    <div style={{marginBottom: "10px"}}>
                        <Link to={`/questions/${question.id}`} className="viewFullBtn">
                            View Full
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(DisplayQuestion))