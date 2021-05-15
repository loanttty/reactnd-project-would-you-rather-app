import React, { Component } from 'react'
import { connect } from "react-redux";
import CreateVote from './CreateVote';
import DisplayVote from './DisplayVote';

class HomePage extends Component {
    render() {
        const {authedUser,users,questions} = this.props
        const answeredQuestionList = Object.keys(users[authedUser].answers)
        const unansweredQuestions = questions.filter((question) => answeredQuestionList.indexOf(question.id) === -1)
                                    .sort((a,b) => b.timestamp - a.timestamp)
        const answeredQuestions = questions.filter((question) => answeredQuestionList.indexOf(question.id) !== -1)
                                    .sort((a,b) => b.timestamp - a.timestamp)
        console.log(unansweredQuestions)
        console.log(answeredQuestions)
        return (
            <div className="home">
                <div className="unansweredQuestions">
                    <h3>Unanswered Questions</h3>
                    <DisplayVote answeredQuestions={answeredQuestions}/>
                    <CreateVote unansweredQuestions={unansweredQuestions} answeredQuestions={answeredQuestions}/>
                    <ul>
                        {unansweredQuestions.map((question) =>
                            <li key={question.id}>
                                <img src={users[question.author].avatarURL}
                                    alt={`Avatar of ${users[question.author].name}`}
                                    className="avatar"/>
                                <div className="question">
                                    Would you rather
                                    <div className="option">{question.optionOne.text}</div>
                                    <button className="viewFull" 
                                            type="submit"
                                            >View Full</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="answeredQuestions">
                    <h3>Answered Questions</h3>
                    <ul>
                        {answeredQuestions.map((question) =>
                            <li key={question.id}>
                                <img src={users[question.author].avatarURL}
                                    alt={`Avatar of ${users[question.author].name}`}
                                    className="avatar"/>
                                <div className="question">
                                    Would you rather
                                    <div className="option">{question.optionOne.text}</div>
                                    <button className="viewFull" type="submit">View Full</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser,users,questions}) {
    return {
        authedUser,
        users,
        questions: Object.values(questions)
    }
}

export default connect(mapStateToProps)(HomePage)