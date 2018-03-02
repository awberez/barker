import React, { Component } from 'react';
import ProfileInfo from "../ProfileInfo";
import Header from "../Header";
import API from "../../utils/API";
import "./Profile.css";

class Profile extends Component {
  state = {
    newData: "",
    data: ""
  }

  componentDidMount() {
  	let userObj = {userId: this.props.match.params.userId}
  	API.getUser(userObj)
      .then(res => this.setState({ user: res.data.users[0] }, ()=>{console.log(this.state.user);}))
      .catch(err => console.log(err));
  }

  matchButton = () => {
  	this.props.history.push(`/discover/${this.props.match.params.userId}`)
  }

  render() {
    return (
    	<div>
    		<button className="button" onClick={this.matchButton}>Find a Match!</button>
    		<Header><h3>Your Profile</h3></Header>
    		{ this.state && this.state.user &&
    		<div>
	    		<div className="userInfo">
		      		<ProfileInfo
						title={"First Name"}
						val={"fname"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.fname}
			        />
			        <ProfileInfo
						title={"Last Name"}
						val={"lname"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.lname}
			        />
			        <ProfileInfo
						title={"Address"}
						val={"addr1"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.addr1}
			        />
			        <ProfileInfo
						title={"City"}
						val={"city"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.city}
			        />
			        <ProfileInfo
						title={"State"}
						val={"state"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.state}
			        />
			        <ProfileInfo
						title={"ZIP"}
						val={"zip"}
						id={this.props.match.params.userId}
						type={"number"}
						data={this.state.user.zip}
			        />
			        <ProfileInfo
						title={"About Me"}
						val={"owner_profile"}
						id={this.props.match.params.userId}
						type={"textarea"}
						data={this.state.user.owner_profile}
			        />
		      	</div>
		      	<div className="dogInfo">
		      	 	<ProfileInfo
						title={"Dog Name"}
						val={"dog_name"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.dog_name}
			        />
			        <ProfileInfo
						title={"Breed"}
						val={"breed"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.breed}
			        />
			        <ProfileInfo
						title={"Sex"}
						val={"sex"}
						id={this.props.match.params.userId}
						type={"radio"}
						data={this.state.user.sex}
			        />
			        <ProfileInfo
						title={"Age (years)"}
						val={"age"}
						id={this.props.match.params.userId}
						type={"number"}
						data={this.state.user.age}
			        />
			        <ProfileInfo
						title={"Demeanor"}
						val={"demeanor"}
						id={this.props.match.params.userId}
						type={"number"}
						data={this.state.user.demeanor}
			        />
			        <ProfileInfo
						title={"Size"}
						val={"size"}
						id={this.props.match.params.userId}
						type={"radio"}
						data={this.state.user.size}
			        />
		      	</div>
		    </div>
			}
	    </div>
    );
  }
}

export default Profile;