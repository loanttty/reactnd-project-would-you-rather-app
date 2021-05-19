import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect} from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import "./NewQuestion.css"

class NewQuestion extends Component {
    state ={
        options:{
            optionOne: '',
            optionTwo: ''
        },
        toHome: false
    }

    handleOnChange =(e) => {
        e.preventDefault()
        const {value, name} = e.target
        this.setState((oldState) => ({
            options:{
                ...oldState.options,
                [name]: value
            },
            toHome: false
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {optionOne,optionTwo} = this.state.options
        const {dispatch} = this.props
        
        dispatch(handleAddQuestion(optionOne,optionTwo))

        this.setState(() => ({
            options:{
                optionOne: '',
                optionTwo: ''
            },
            toHome: true
        }))
    }
    render() {
        const {optionOne,optionTwo} = this.state.options
        const {toHome} = this.state

        if (toHome === true) {
            return <Redirect to="/" />
        }
        
        return (
            <div className="newQuestion">
                <h3>New Question</h3>
                <h4>Complete the question:</h4>
                <p style={{paddingTop :"10px"}}>Would you rather...</p>
                <form className="options" onSubmit={this.handleSubmit}>
                    <input name="optionOne"
                            className="option"
                            type="text"
                            value={optionOne}
                            placeholder="Enter Option One Text Here" 
                            onChange={this.handleOnChange} />
                    <p>OR</p>
                    <input name="optionTwo"
                            className="option" 
                            type="text"
                            value={optionTwo}
                            placeholder="Enter Option Two Text Here" 
                            onChange={this.handleOnChange} />
                    <br/>
                    <button className="btn"
                            type="submit"
                            disabled={optionOne === '' || optionTwo === ''} >Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)