import React from 'react';
import API from "../../utils/API";
import "./SubmitForm.css";

const cloudinary = window.cloudinary;

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
        image: "",
        breeds: []
}

    componentDidMount() {
        API.getBaseBreedsList()
          .then(res => this.setState({ breeds: res.data.message }))
          .catch(err => console.log(err));
      }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.thumb) {
            let userObj = this.state;
            userObj.userId = this.props.userId;
            console.log(userObj);
            API.createUser(userObj)
              .then(res => {
                console.log(res);
                this.props.history.push("/profile");
               })
              .catch(err => console.log(err));
        }
        else alert("Don't forget a profile image!");
    }

    uploadWidget = event => {
        event.preventDefault();
        cloudinary.openUploadWidget({ cloud_name: 'dn5mficxw', upload_preset: 'a1tb6tyr', tags:['profile-img']},
            (error, result)=>{
                if (result) {
                    this.setState({image: result[0].secure_url, thumb: result[0].thumbnail_url});
                    console.log(result[0]);
                }
            });
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
                                        value={this.state.breed}
                                        onChange={this.handleUserInput}
                                        name="breed"
                                        list="breeds"
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        id="breed"
                                    />
                                    <datalist id="breeds">
                                        {this.state.breeds.map(breed => <option value={breed} key={breed} />)}
                                    </datalist>
                                </fieldset>

                            </div>

                            <div className='group'>

                                <fieldset className="form-group">
                                    <p>Dog Gender:</p>
                                    <div className="form-input" required onChange={this.handleUserInput}>
                                        <input type="radio" name="gender" value="Male" /> Male  <input type="radio" name="gender" value="Female" /> Female
                                    </div>
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
                                <div className="form-input" required onChange={this.handleUserInput}>
                                    <input type="radio" name="size" value="Small" /> Small <br/>
                                    <input type="radio" name="size" value="Medium" /> Medium <br/>
                                    <input type="radio" name="size" value="Large" /> Large <br/>
                                    <input type="radio" name="size" value="Extra Large" /> Extra Large <br/>
                                </div>
                            </fieldset>

                                <fieldset className="form-group">
                                    <p>Profile Image:</p>
                                    {this.state && this.state.thumb &&
                                        <img src={this.state.thumb} alt="profile thumbnail" />
                                    }
                                   <div className="upload">
                                        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                                            {this.state.image === "" ? "Choose Image" : "New Image"}
                                        </button>
                                    </div>
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