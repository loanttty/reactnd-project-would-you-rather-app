import React, { Component } from 'react'
import { connect } from "react-redux";
import { handleSetAuthedUser } from '../actions/authedUser';

class SignIn extends Component {
    state = {
        selectedId:''
    }
    updateSelectedId = (e) => {
        e.preventDefault()
        this.setState(() => ({
            selectedId: e.target.value
        }))
    }
    
    handleSetAuthedUserId = (e) => {
        e.preventDefault()
        this.props.dispatch(handleSetAuthedUser(this.state.selectedId))
    }

    render() {
        const userIds = this.props.userIds
        return(
            <div className="signIn">
                <h3>Welcome to Would You Rather App</h3>
                <p>Please sign in to continue</p>
                <img alt="logo" className="logo" />
                <form id="dropdownList" onSubmit={this.handleSetAuthedUserId}>
                    <select id="dropdownList" onChange={this.updateSelectedId}>
                        <option default>Select User</option>
                        {userIds.map((id) => <option key={id}>{id}</option>)}
                    </select>
                    <button type="submit" className="btn">Sign In</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {userIds: Object.keys(users)}
}

export default connect(mapStateToProps)(SignIn)