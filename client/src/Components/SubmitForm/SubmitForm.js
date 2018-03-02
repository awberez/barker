import React from 'react';
import API from "../../utils/API";
import "./SubmitForm.css";


class SubmitForm extends React.Component {
    state = {
        fname: "",
        lname: "",
        addr1: "",
        city: "",
        state: "",
        zip: "",
        owner_profile: "",
        dog_name: "",
        breed: "",
        sex: "",
        age: "",
        size: "",
        demeanor: ""
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
                        
                        <div className='modal-body flex'>

                            <div>

                                <fieldset className="form-group">
                                    <p>First Name:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="fname"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.fname}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Last Name:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="lname"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.lname}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Address:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="addr1"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.addr1}
                                    />
                                </fieldset>


                            </div>

                            <div>


                                <fieldset className="form-group">
                                    <p>City:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="city"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.city}
                                    />
                                </fieldset>


                                <fieldset className="form-group">
                                    <p>State:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="state"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.state}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Zip:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="zip"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.zip}
                                    />
                                </fieldset>


                            </div>

                            <div>



                                <fieldset className="form-group">
                                    <p>Profile:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="owner_profile"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.owner_profile}
                                    />
                                </fieldset>
                            </div>
                            <div>

                                <fieldset className="form-group">
                                    <p>Dog Name:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="dog_name"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.dog_name}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Breed:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="breed"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.breed}
                                    />
                                </fieldset>

                            </div>
                            <div>

                                <fieldset className="form-group">
                                    <p>Dog Gender:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="sex"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.sex}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Age:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="age"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.age}
                                    />
                                </fieldset>

                            </div>

                            <div>
                                <fieldset className="form-group">
                                    <p>Demeanor:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="demeanor"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.demeanor}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Size:</p>
                                    <input
                                        id="formName"
                                        className="form-input"
                                        name="size"
                                        type="text"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.size}
                                    />
                                </fieldset>

                            </div>

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