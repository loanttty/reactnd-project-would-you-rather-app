import React, { Component } from 'react'
import { connect } from "react-redux";
import { handleSetAuthedUser } from '../actions/authedUser';
import { handleAddUser } from '../actions/users';

class SignIn extends Component {
    state = {
        selectedId:'',
        id:'',
        name:'',
        avatarURL:'',
        expandedSection: false
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
    
    expand = (e) => {
        e.preventDefault()
        this.setState(() => ({
            expandedSection: true
        }))
    }

    updateNewId = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState((oldState) => ({
            ...oldState,
            [name]: value
        }))
    }

    handleCreateUserId = (e) => {
        e.preventDefault()
        const {id, name, avatarURL} = this.state
        this.props.dispatch(handleAddUser(id, name, avatarURL))
    }

    render() {
        const userIds = this.props.userIds
        const {expandedSection} = this.state
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
                <button type="submit" className="btn" onClick={this.expand}>Can't find yourself in the list?</button>
                {expandedSection === true
                    ? <form id="NewUserId" onSubmit={this.handleCreateUserId}>
                        <input type="text" name="id" placeholder="Enter your user Id" onChange={this.updateNewId}/>
                        <input type="text" name="name" placeholder="Enter your namw" onChange={this.updateNewId}/>
                        <input type="text" name="avatarURL" placeholder="Enter URL of your avatar" onChange={this.uupdateNewId}/>
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                    : null}
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {userIds: Object.keys(users)}
}

export default connect(mapStateToProps)(SignIn)