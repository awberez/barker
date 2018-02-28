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
  	//userObj.id = this.props.match.params.userId;
  	//this.setState({ user: userObj }, ()=>{console.log(this.state.user);});
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
						val={"firstName"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.firstName}
			        />
			        <ProfileInfo
						title={"Last Name"}
						val={"lastName"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.lastName}
			        />
			        <ProfileInfo
						title={"Address"}
						val={"address"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.address}
			        />
			        <ProfileInfo
						title={"City"}
						val={"city"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.city}
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
						val={"profile"}
						id={this.props.match.params.userId}
						type={"textarea"}
						data={this.state.user.profile}
			        />
		      	</div>
		      	<div className="dogInfo">
		      	 	<ProfileInfo
						title={"Dog Name"}
						val={"dogName"}
						id={this.props.match.params.userId}
						type={"text"}
						data={this.state.user.dogName}
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
						title={"Weight (lbs)"}
						val={"weight"}
						id={this.props.match.params.userId}
						type={"number"}
						data={this.state.user.weight}
			        />
		      	</div>
		    </div>
			}
	    </div>
    );
  }
}

export default Profile;