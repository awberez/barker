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
        demeanor: "",
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
          .then(res => this.props.history.push("/profile"))
          .catch(err => console.log(err));
    }

    render () {
        const containerClass = this.props.modal ? 'modal-container modal-container-active' : 'modal-container'
        return (
            <div>
                <div className={containerClass}>
                    <form onSubmit={this.handleSubmit}>
                        <div className='modal-header'>
                            <p>~ Please Enter Your Information ~</p>
                        </div>
                        
                        <div className='modal-body flex flex-center'>

                            <div className='group'>

                                <fieldset className="form-group">
                                    <p>First Name:</p>
                                    <input
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
                                        className="form-input"
                                        name="addr1"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.addr1}
                                    />
                                </fieldset>


                            </div>

                            <div className='group'>


                                <fieldset className="form-group">
                                    <p>City:</p>
                                    <input
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
                                        className="form-input"
                                        name="state"
                                        type="select"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.state}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Zip:</p>
                                    <input
                                        className="form-input"
                                        name="zip"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.zip}
                                    />
                                </fieldset>


                            </div>

                            <div className='group'>



                                <fieldset className="form-group">
                                    <p>Profile:</p>
                                    <input
                                        className="form-input"
                                        name="owner_profile"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.owner_profile}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Name:</p>
                                    <input
                                        className="form-input"
                                        name="dog_name"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.dog_name}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Breed:</p>
                                    <input
                                        className="form-input"
                                        name="breed"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.breed}
                                    />
                                </fieldset>

                            </div>

                            <div className='group'>

                                <fieldset className="form-group">
                                    <p>Dog Gender:</p>
                                    <input
                                        className="form-input"
                                        name="sex"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.sex}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Dog Age (years):</p>
                                    <input
                                        className="form-input"
                                        name="age"
                                        type="number"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.age}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <p>Demeanor:</p>
                                    <input
                                        className="form-input"
                                        name="demeanor"
                                        type="text"
                                        required
                                        onChange={this.handleUserInput}
                                        value={this.state.demeanor}
                                    />
                                </fieldset>

                            </div>

                            <div className='group'>
                                <fieldset className="form-group">
                                <p>Dog Size:</p>
                                <input
                                    className="form-input"
                                    name="size"
                                    type="text"
                                    required
                                    onChange={this.handleUserInput}
                                    value={this.state.size}
                                />
                            </fieldset>

                            </div>

                        </div>
                        <div className='modal-footer'></div>
                        <button className='sub-button' type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default SubmitForm;