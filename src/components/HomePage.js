import React, { Component } from 'react'
import { connect } from "react-redux";
import DisplayQuestion from './DisplayQuestions';
import "./HomePage.css"
import { Tabs, Tab } from "react-bootstrap"

class HomePage extends Component {
    render() {
        const {authedUser,users,questions} = this.props
        const answeredQuestionList = Object.keys(users[authedUser].answers)
        const unansweredQuestions = questions.filter((question) => answeredQuestionList.indexOf(question.id) === -1)
                                    .sort((a,b) => b.timestamp - a.timestamp)
        const answeredQuestions = questions.filter((question) => answeredQuestionList.indexOf(question.id) !== -1)
                                    .sort((a,b) => b.timestamp - a.timestamp)
        return (
            <div className="home">
                <Tabs defaultActiveKey="unansweredQuestions" id="tabs">
                    <Tab eventKey="unansweredQuestions" title="Unanswered Questions">
                        <ul>
                        { unansweredQuestions.length > 0
                            ? unansweredQuestions.map((question) =>
                                <li key={question.id}>
                                    <DisplayQuestion question={question} users={users} />
                                </li>)
                            : "You have answered all questions."}
                        </ul>
                    </Tab>
                    <Tab eventKey="answeredQuestions" title="Answered Questions">
                        <ul>
                        { answeredQuestions.length > 0
                            ? answeredQuestions.map((question) =>
                                <li key={question.id}>
                                    <DisplayQuestion question={question} users={users} />
                                </li>)
                            : "No question answered yet."}
                    </ul>
                    </Tab>
                </Tabs>
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