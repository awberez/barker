import React, { Component } from 'react';
import API from "../../utils/API";
import "./DiscoverCard.css";

class DiscoverCard extends Component {
	constructor (props) {
        super(props);
        this.state = {
        	matched: false
        }
    }

	componentDidMount() {
		this.checkMatch(this.props.user.id);
	}

	checkMatch = id => {
		let userObj = {userId: this.props.userId, matchId: id}
		API.checkMatch(userObj)
	      .then(res => {
	      	console.log(id + " " + res.data);
	      	this.setState({ matched: res.data ? true : false });
	      })
	      .catch(err => console.log(err));
	}

	matchBtn = id => {
		let userObj = {userId: this.props.userId, matchId: id}
		API.addMatch(userObj)
	      .then(res => {
	      	console.log(res);
	      	this.setState({ matched: true });
	      	if (res.data) alert("You've got a match!");
	      })
	      .catch(err => console.log(err));
	}

	render () {
        return (        
			<div className="card">
			    <div className="img-container">
			      <img alt={this.props.dog_name} src={this.props.user.image}/>
			    </div>
			    <h3>{this.props.user.fname} and {this.props.dog.dog_name}</h3>
			    <div className="content">
			    	<br/>
			      <p>{this.props.user.owner_profile}</p>
			      <hr />
			      <ul>
			        <li>
			          <strong>Breed:</strong> {this.props.dog.breed}
			        </li>
			        <li>
			          <strong>Sex:</strong> {this.props.dog.sex}
			        </li>
			        <li>
			          <strong>Age:</strong> {this.props.dog.age}
			        </li>
			        <li>
			          <strong>Size:</strong> {this.props.dog.size}
			        </li>
			        <li>
			          <strong>Demeanor:</strong> {this.props.dog.demeanor}
			        </li>
			      </ul>
			    </div>
			    <button className="match-btn" disabled={this.state.matched} onClick={() => this.matchBtn(this.props.user.id)}>{this.state.matched ? "Match Requested" : "Match!"}</button>
		  	</div>
		)
    }
}

export default DiscoverCard; 