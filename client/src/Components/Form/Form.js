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

    componentDidMount() {
        if (this.props.userId && !this.props.modal) this.props.history.push('/profile');
        else if (this.props.userId && this.props.modal) this.setState({userId: this.props.userId, modal: true});
      }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            case 'passwordTwo':
                passwordValid = value === this.state.password;
                fieldValidationErrors.password = passwordValid ? '': ' does not match';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    toggleState = () => {
        let signupState = this.state.signup;
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
                    this.props.handler(res.data.id);
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
                    this.props.handler(res.data.id);
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
                        <div className={`input-size form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <label htmlFor="email">Email address</label>
                            <input type="email" required className="form-control" name="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.handleUserInput}  />
                        </div>
                        {this.state.signup
                          ? <React.Fragment>
                                <div className={`input-size form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Password"
                                           value={this.state.password}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <div className={`input-size form-group ${this.errorClass(this.state.formErrors.passwordTwo)}`}>
                                    <label htmlFor="password">Confirm Password</label>
                                    <input type="password" className="form-control" name="passwordTwo"
                                           placeholder="Password"
                                           value={this.state.passwordTwo}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <button type="submit" className="button" disabled={!this.state.formValid}>Sign up</button>
                                <span onClick={this.toggleState}>
                                    <p>Already have an account?<br/>Click here to log in.</p>
                                </span>
                            </React.Fragment>
                          : <React.Fragment>
                                <div className={`input-size form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Password"
                                           value={this.state.password}
                                           onChange={this.handleUserInput}  />
                                </div>
                                <button type="submit" className="button" disabled={!this.state.formValid}>Log In</button>
                                <span onClick={this.toggleState}>
                                    <p>Don't have an account yet?<br/>Click here to sign up.</p>
                                </span>
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