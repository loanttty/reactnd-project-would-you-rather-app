import React, { Component } from 'react'
import { connect } from "react-redux"
import { handleSetAuthedUser } from '../actions/authedUser'
import { handleAddUser } from '../actions/users'
import { Form, Row } from "react-bootstrap"

class SignIn extends Component {
    state = {
        selectedId:'',
        id:'',
        name:'',
        avatarURL:'',
        expandedSection: false,
        errorMessage: false, 
        infoMessage: false
    }
    updateSelectedId = (e) => {
        e.preventDefault()
        this.setState(() => ({
            selectedId: e.target.value,
            errorMessage: false
        }))
    }

    handleSetAuthedUserId = (e) => {
        e.preventDefault()
        if (this.state.selectedId === '') {
            this.setState(() => ({
                errorMessage:true
            }))
        } else {
            this.props.dispatch(handleSetAuthedUser(this.state.selectedId))
        }
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
            [name]: value,
            infoMessage: false
        }))
    }

    handleCreateUserId = (e) => {
        e.preventDefault()
        const {id, name, avatarURL} = this.state
        this.props.dispatch(handleAddUser(id, name, avatarURL))

        this.setState({
            id:'',
            name:'',
            avatarURL:'',
            infoMessage: true
        })
    }

    render() {
        const userIds = this.props.userIds
        const {id, name, avatarURL, expandedSection, errorMessage, infoMessage} = this.state
        return(
            <div className="signIn">
                <h3>😍Welcome to Would You Rather App! 😍</h3>
                <p>Please sign in to continue</p>
                <img src="https://r1.ilikewallpaper.net/iphone-wallpapers/download/35026/Minimal-Pink-Piggy-Cute-Eyes--iphone-wallpaper-ilikewallpaper_com.jpg" 
                     alt="logo" className="App-logo" />
                <Form id="dropdownForm" onSubmit={this.handleSetAuthedUserId}>
                    <Row>
                        <select id="dropdownList" onChange={this.updateSelectedId}>
                            <option default>Please Select Your User Id Here</option>
                            {userIds.map((id) => <option key={id}>{id}</option>)}
                        </select>
                    </Row>
                    <Row>
                        <button type="submit" className="btn">Sign In</button>
                        <p className="error">{errorMessage ? "Please select a valid user id" : null}</p>
                    </Row>
                </Form>
                <button type="submit" className="openNewUserForm" onClick={this.expand}>Can't find yourself in the list?</button>
                {expandedSection === true
                    ? <Form id="NewUserId" onSubmit={this.handleCreateUserId}>
                        <Row>
                            <input type="text" className="input" value={id} name="id" placeholder="Enter your user Id" onChange={this.updateNewId}/>
                        </Row>
                        <Row>
                            <input type="text" className="input" value={name} name="name" placeholder="Enter your name" onChange={this.updateNewId}/>
                        </Row>
                        <Row>
                            <input type="text" className="input" value={avatarURL} name="avatarURL" placeholder="Enter the URL of your avatar" onChange={this.updateNewId}/>
                        </Row>
                        <Row>
                            <button type="submit" className="btn" disabled={id === '' || name === '' || avatarURL === ''}>Sign Up</button>
                            <p className="info">{infoMessage ? "New User Id is added. Please sign in." : null}</p>
                        </Row>
                    </Form>
                    : null}
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {userIds: Object.keys(users)}
}

export default connect(mapStateToProps)(SignIn)