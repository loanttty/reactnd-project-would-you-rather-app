import React, { Component } from 'react'
import { connect } from "react-redux";
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state ={
        options:{
            optionOne: '',
            optionTwo: ''
        }
    }

    handleOnChange =(e) => {
        e.preventDefault()
        const {value, name} = e.target
        this.setState((oldState) => ({
            options:{
                ...oldState.options,
                [name]: value
            }
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
            }
        }))
    }
    render() {
        const {optionOne,optionTwo} = this.state.options
        console.log(this.state)
        return (
            <div className="newQuestion">
                <h3>New Question</h3>
                <h4>Complete the question:</h4>
                <p>Would you rather...</p>
                <form className="options" onSubmit={this.handleSubmit}>
                    <input name="optionOne" 
                            type="text"
                            value={optionOne}
                            placeholder="Enter Option One Text Here" 
                            onChange={this.handleOnChange} />
                    <p>OR</p>
                    <input name="optionTwo" 
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