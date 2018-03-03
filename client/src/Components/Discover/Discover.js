import React, { Component } from 'react';
import API from "../../utils/API";
import DiscoverCard from "../DiscoverCard";
import './Discover.css';

class Discover extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

	componentDidMount() {
	  	let userObj = {userId: this.props.userId}
	  	if (!userObj.userId) this.props.history.push('/');
	  	API.getUser(userObj)
	      .then(res => {
	      	if (!res.data.dog) {
	      	    this.props.finishForm();
	      	    this.props.history.push('/');
	        }
	        else {
	        	API.findMatches(userObj)
			      .then(res => {
			      	this.setState({ matches: res.data, userMatches: [], dogMatches: [] }, ()=>{
			      		console.log(res);
			      		this.state.matches.forEach(id => {
			      			console.log(id);
			      			let userObj = {userId: id.id};
			      			API.getUser(userObj)
						      .then(res => {
						      	if (res.data.dog) {
						      	    let userMatches = this.state.userMatches, dogMatches = this.state.dogMatches;
						      	    userMatches.push(res.data.user);
						      	    dogMatches.push(res.data.dog);
						      	    this.setState({userMatches, dogMatches}, ()=>{console.log(dogMatches);});
						        }
						      })
						      .catch(err => console.log(err));
			      		});
			      	});
			      })
			      .catch(err => console.log(err));
	        }
	      })
	      .catch(err => console.log(err));
	}

	matchBtn = matchId => {
		let userObj = {userId: this.props.userId, matchId: matchId}
		API.addMatch(userObj)
	      .then(res => {
	      	console.log(res);
	      	alert(res.data ? "You've got a match!" : "Fingers crossed!");
	      })
	      .catch(err => console.log(err));
	}

    render () {
        return (
            <div>
                {this.state && this.state.matches && 
                	this.state.userMatches.map(user => (
		                <DiscoverCard
		                	key={user.id}
		                	user={user}
		                	dog={this.state.dogMatches.find(dog => dog.owner_id === user.id)}
		                	matchBtn={this.matchBtn}
		                />
              		))
                }
            </div>
        )
    }
}

export default Discover;