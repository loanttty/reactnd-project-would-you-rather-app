import React, { Component } from 'react'
import { connect } from "react-redux";
import {handleInitialUpdateStoreQuestions,
        handleInitialUpdateStoreUsers} from "../actions/shared"
import NewQuestion from "./NewQuestion"
import Leaderboard from "./Leaderboard"
import HomePage from "./HomePage"
import SignIn from "./SignIn"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialUpdateStoreQuestions())
    this.props.dispatch(handleInitialUpdateStoreUsers())
    //this.props.dispatch(handleInitialUpdateStoreAuthedUser())
  }
  render() {
    return (
      <div className="App">
        <SignIn />
        { this.props.loading === true 
          ? null
          : <HomePage />
        }
      </div>
    );
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  return {
    loading: authedUser === null || Object.keys(users).length === 0 || Object.keys(questions).length === 0,
  }
}

export default connect(mapStateToProps)(App)
