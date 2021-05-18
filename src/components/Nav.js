import React from 'react'  
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser';

function Nav (props) {
    const {authedUser,users} = props
    return (
        <nav className="nav">
            <ul className="navList">
                <li className="navItem">
                    <NavLink to='/' exact activeClassName='active' className="link">
                        Home
                    </NavLink>
                </li>
                <li className="navItem">
                    <NavLink to='/new' activeClassName='active' className="link">
                        New Question
                    </NavLink>
                </li>
                <li className="navItem">
                    <NavLink to='/leaderboard' activeClassName='active' className="link">
                        Leader Board
                    </NavLink>
                </li>
                <li className="logOut">
                    {authedUser === null ? "Hello, guest!" : `Welcome, ${users[authedUser].name}!`}
                    {authedUser === null 
                        ? null 
                        : <NavLink to="/" exact 
                                        className="logOutBtn"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            props.dispatch(handleSetAuthedUser(null))}}>
                        Log Out</NavLink>}
                </li>
            </ul>
        </nav>
    )
}

function mapStateToProps ({authedUser,users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Nav)