import React from 'react'  
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser';

function Nav (props) {
    const {authedUser,users} = props
    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
            </ul>
            {authedUser === null ? "Hello, guest!" : `Welcome, ${users[authedUser].name}!`}
            {authedUser === null 
                ? null 
                : <NavLink to="/" exact 
                                  activeClassName='active' 
                                  onClick={(e)=>{
                                    e.preventDefault()
                                    props.dispatch(handleSetAuthedUser(null))}}>
                Log Out</NavLink>}
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