import React, { Component } from 'react'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {handleInitialUpdateStoreQuestions,
        handleInitialUpdateStoreUsers} from "../actions/shared"
import NewQuestion from "./NewQuestion"
import Leaderboard from "./Leaderboard"
import HomePage from "./HomePage"
import SignIn from "./SignIn"
import Nav from "./Nav"
import CreateVote from './CreateVote'
import PageNotFound from './PageNotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialUpdateStoreQuestions())
    this.props.dispatch(handleInitialUpdateStoreUsers())
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          { this.props.loading === true 
            ? <SignIn/>
            : <div>
                <Route path='/' exact component={HomePage} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/questions/:id' exact component={CreateVote} />
                <Route path='*' component={PageNotFound} />
              </div>
          }
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  return {
    loading: authedUser === null || Object.keys(users).length === 0 || Object.keys(questions).length === 0,
  }
}

export default connect(mapStateToProps)(App)
