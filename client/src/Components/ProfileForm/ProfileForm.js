import React, { Component } from 'react';
import InfoBox from "../InfoBox";
import "./ProfileInfo.css";

class Profile extends Component {
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
    console.log(event.target.id);
    this.setState({ data: this.state.newData, editing: false });
  }

  button = (bool) => {
    this.setState({ newData: this.state.data, editing: bool });
  }

  render() {
    return (
      	<div>
	        <InfoBox
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

export default Profile;