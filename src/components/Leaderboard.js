import { connect } from "react-redux";
import "./Leaderboard.css"

 function Leaderboard (props) {
    const users = props.users
    return (
        <div className="leaderboard">
            <ul>
                {users.map((user) =>
                    <li key={user.id} className="scoreCard">
                        <img src={user.avatarURL}
                             alt={`Avatar of ${user.name}`}
                             className="avatar" />
                        <div className="scoreInfo">
                            <h4>{user.name}</h4>
                            <p>Answered Questions: {Object.keys(user.answers).length}</p>
                            <p>Created Questions: {user.questions.length}</p>
                        </div>
                        <div className="totalScore">
                            <p>Score</p>
                            <div className="score">{Object.keys(user.answers).length + user.questions.length}</div>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

function mapStateToProps ({users}) {
    return {
        users: Object.values(users)
                     .sort((a,b) => Object.keys(b.answers).length + b.questions.length - (Object.keys(a.answers).length + a.questions.length))
    }
}

export default connect(mapStateToProps)(Leaderboard)