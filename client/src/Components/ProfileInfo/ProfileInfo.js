import React, { Component } from 'react';
import InfoBox from "../InfoBox";
import API from "../../utils/API";
import "./ProfileInfo.css";

class ProfileInfo extends Component {
  state = {
    newData: "",
    data: this.props.data,
    editing: false
  }

  handleChange = event => {
    this.setState({ newData: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.id + "click");
    let userObj = {userId: this.props.id, val: this.props.val, data: this.state.newData};
    if (this.props.table === "user") {
      API.updateUser(userObj)
        .then(res => {
          console.log(res);
          this.setState({ data: this.state.newData, editing: false });
        })
        .catch(err => console.log(err));
    }
    else {
      API.updateDog(userObj)
        .then(res => {
          console.log(res);
          this.setState({ data: this.state.newData, editing: false });
        })
        .catch(err => console.log(err));
    }
  }

  button = (bool) => {
    this.setState({ newData: this.state.data, editing: bool });
  }

  render() {
    return (
      	<div>
	        <InfoBox
            className='sml-font'
            title={this.props.title}
            type={this.props.type}
    				edit={this.state.editing}
    				data={this.state.data}
    				newData={this.state.newData}
    				handleChange={this.handleChange}
    				handleSubmit={this.handleSubmit}
    				button={this.button}
	        />
      	</div>
    );
  }
}

export default ProfileInfo;