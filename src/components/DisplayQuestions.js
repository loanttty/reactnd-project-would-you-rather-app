import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, withRouter} from 'react-router-dom'  


class DisplayQuestion extends Component {
    render() {
        const {question, users} = this.props
        return (
            <div className="questionNotInFull">
                <img src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].name}`}
                    className="avatar"/>
                <div className="question">
                    Would you rather
                    <div className="option">{question.optionOne.text}</div>
                    <button className="viewFull" type="submit">
                        <Link to={`/questions/${question.id}`} className="vote">
                            View Full
                        </Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(DisplayQuestion))