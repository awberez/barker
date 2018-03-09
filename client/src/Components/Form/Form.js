import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import API from "../../utils/API";
import './Form.css';
import SubmitForm from "../SubmitForm";

class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordTwo: '',
            formErrors: {email: '', password: '', passwordTwo: '', invalid: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            signup: true
        }
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    toggleState = () => {
        let signupState = this.state.signup;
        console.log(signupState);
        this.setState({ 
            email: '', 
            password: '', 
            passwordTwo: '', 
            formErrors: {email: '', password: '', passwordTwo: ''}, 
            signup: signupState ? false : true 
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let userObj = {user_login: this.state.email, user_passwd: this.state.password}, fieldValidationErrors = this.state.formErrors;
        if (!this.state.signup) {
            API.logIn(userObj)
              .then(res => {
                console.log(res);
                if (res.data.id) {
                    this.props.handler(res.data.id, res.data.user_login);
                    this.props.history.push("/profile");
                }
                else {
                    fieldValidationErrors.invalid = 'email or password';
                    this.setState({ formErrors: fieldValidationErrors })
                }
              })
              .catch(err => console.log(err));
        }
        else {
            API.signUp(userObj)
              .then(res => {
                console.log(res);
                if (res.data.id) {
                    this.props.handler(res.data.id, res.data.user_login);
                    this.setState({userId: res.data.id, modal: true});
                }
                else {
                    fieldValidationErrors.email = 'is already in use';
                    this.setState({ formErrors: fieldValidationErrors })
                }
              })
              .catch(err => console.log(err));
        }
    }

    render () {
        return (
            <div className='flex-container flex-end flex-space'>
                <div className="form" onSubmit={this.handleSubmit}>
                    <form className="flex-col">
                        <h2>{this.state.signup ? "Sign Up" : "Log In"}</h2>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className={`input-size form-group auto pad-top-20 ${this.errorClass(this.state.formErrors.email)}`}>
                            <label className='text-sml' htmlFor="email">Email address:</label>
                            <input type="email" className="form-control" name="email"
                                   placeholder="Email"
                                   required
                                   value={this.state.email}
                                   onChange={this.handleUserInput}  />
                        </div>
                        {this.state.signup
                          ? <React.Fragment>
                                <div className={`input-size form-group auto ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label className='text-sml' htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Password"
                                           required
                                           value={this.state.password}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <div className={`input-size form-group auto ${this.errorClass(this.state.formErrors.passwordTwo)}`}>
                                    <label className='text-sml' htmlFor="password">Confirm Password:</label>
                                    <input type="password" className="form-control" name="passwordTwo"
                                           placeholder="Password"
                                           required
                                           value={this.state.passwordTwo}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <div className='pad-top-20'>
                                    <button type="submit" className="button" disabled={!this.state.formValid}>Sign up</button>
                                    <span onClick={this.toggleState}>
                                        <p>Already have an account?<br/>Click here to log in.</p>
                                    </span>
                                </div>
                            </React.Fragment>
                          : <React.Fragment>
                                <div className={`input-size form-group auto ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Password"
                                           required
                                           value={this.state.password}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <div className='pad-top-20'>
                                    <button type="submit" className="button" disabled={!this.state.formValid}>Log In</button>
                                    <span onClick={this.toggleState}>
                                        <p>Don't have an account yet?<br/>Click here to sign up.</p>
                                    </span>
                                </div>
                            </React.Fragment>
                        }
                    </form>
                    <SubmitForm
                        history={this.props.history}
                        modal={this.state.modal}
                        userId={this.state.userId}
                    />
                </div>
            </div>
        )
    }
}

export default Form;