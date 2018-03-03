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
  	let userObj = {userId: this.props.userId}
  	if (!userObj.userId) this.props.history.push('/');
  	console.log(this.props.match);
  	API.getUser(userObj)
      .then(res => this.setState({ user: res.data.user, dog: res.data.dog }, ()=>{console.log(res);}))
      .catch(err => console.log(err));
  }

  matchButton = () => {
  	this.props.history.push('/discover')
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
						id={this.props.userId}
						type={"text"}
						data={this.state.user.fname}
						table={"user"}
			        />
			        <ProfileInfo
						title={"Last Name"}
						val={"lname"}
						id={this.props.userId}
						type={"text"}
						data={this.state.user.lname}
						table={"user"}
			        />
			        <ProfileInfo
						title={"Address"}
						val={"addr1"}
						id={this.props.userId}
						type={"text"}
						data={this.state.user.addr1}
						table={"user"}
			        />
			        <ProfileInfo
						title={"City"}
						val={"city"}
						id={this.props.userId}
						type={"text"}
						data={this.state.user.city}
						table={"user"}
			        />
			        <ProfileInfo
						title={"State"}
						val={"state"}
						id={this.props.userId}
						type={"text"}
						data={this.state.user.state}
						table={"user"}
			        />
			        <ProfileInfo
						title={"ZIP"}
						val={"zip"}
						id={this.props.userId}
						type={"number"}
						data={this.state.user.zip}
						table={"user"}
			        />
			        <ProfileInfo
						title={"About Me"}
						val={"owner_profile"}
						id={this.props.userId}
						type={"textarea"}
						data={this.state.user.owner_profile}
						table={"user"}
			        />
		      	</div>
		      	<div className="dogInfo">
		      	 	<ProfileInfo
						title={"Dog Name"}
						val={"dog_name"}
						id={this.props.userId}
						type={"text"}
						data={this.state.dog.dog_name}
						table={"dog"}
			        />
			        <ProfileInfo
						title={"Breed"}
						val={"breed"}
						id={this.props.userId}
						type={"text"}
						data={this.state.dog.breed}
						table={"dog"}
			        />
			        <ProfileInfo
						title={"Sex"}
						val={"sex"}
						id={this.props.userId}
						type={"radio"}
						data={this.state.dog.sex}
						table={"dog"}
			        />
			        <ProfileInfo
						title={"Age (years)"}
						val={"age"}
						id={this.props.userId}
						type={"number"}
						data={this.state.dog.age}
						table={"dog"}
			        />
			        <ProfileInfo
						title={"Demeanor"}
						val={"demeanor"}
						id={this.props.userId}
						type={"number"}
						data={this.state.dog.demeanor}
						table={"dog"}
			        />
			        <ProfileInfo
						title={"Size"}
						val={"size"}
						id={this.props.userId}
						type={"radio"}
						data={this.state.dog.size}
						table={"dog"}
			        />
		      	</div>
		    </div>
			}
	    </div>
    );
  }
}

export default Profile;