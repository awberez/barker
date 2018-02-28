import React from 'react';
import API from "../../utils/API";
import "./SubmitForm.css";


class SubmitForm extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        profile: "",
        dogName: "",
        breed: "",
        sex: "",
        age: "",
        weight: ""
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = event => {
        event.preventDefault();
        let userObj = this.state;
        userObj.userId = this.props.userId;
        console.log(userObj);
            API.createUser(userObj)
              .then(res => this.props.history.push(`/profile/${this.props.userId}`))
              .catch(err => console.log(err));
    }

    render () {
        const containerClass = this.props.modal ? 'modal-container modal-container-active' : 'modal-container'
        return (
            <div>
                <div className={containerClass}>
                    <form>
                        <div className='modal-header'>
                            <p>Sign Up</p>
                        </div>
                        
                        <div className='modal-body'>
                            {/*form fields go here*/}
                        </div>
                        <div className='modal-footer'></div>
                        <button type="submit" onClick={this.handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default SubmitForm;