import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function DisplayVote (props) {
    const {userName, 
           userAvatar, 
           userId, 
           authedUser, 
           votesOptionOne, 
           optionOneText, 
           votesOptionTwo,
           optionTwoText} = props
    const totalVotes = votesOptionOne.length + votesOptionTwo.length
    const optionOnePercentage = votesOptionOne.length / totalVotes * 100
    const optionTwoPercentage = votesOptionTwo.length / totalVotes * 100
    return (
        <div className="answered">
            <h4>Asked by {userName}:</h4>
                <img src={userAvatar} alt={`Avatar of ${userId}`}/>
                <div className="voteResult">
                    Result:
                    <div className="optionOne">
                        Would you rather {optionOneText}
                        {votesOptionOne.filter((id) => id === authedUser).length === 1
                        ? "You voted this" : null}
                        <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`}/>
                        <br />
                        {votesOptionOne.length} out of {totalVotes}
                    </div>
                    <div className="optionOne">
                        Would you rather {optionTwoText}
                        {votesOptionTwo.filter((id) => id === authedUser).length === 1
                        ? "You voted this" : null}
                            <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                        <br />
                        {votesOptionTwo.length} out of {totalVotes}
                    </div>
                </div>
        </div>
    )
}
