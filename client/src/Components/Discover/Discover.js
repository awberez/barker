import React, { Component } from 'react';
import API from "../../utils/API";
import DiscoverCard from "../DiscoverCard";
import Header from "../Header";
import geolib from "geolib";
import './Discover.css';

let userCoords = [], userObj;

class Discover extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

	componentDidMount() {
	  	userObj = {userId: this.props.userId}
	  	if (!userObj.userId) this.props.history.push('/');
	  	API.getUser(userObj)
	      .then(res => {
	      	if (!res.data.dog) {
	      	    this.props.finishForm();
	      	    this.props.history.push('/');
	        }
	        else {
	        	userCoords = res.data.user.geoLocat.coordinates;
	        	this.getMatches(16100);
	        }
	      })
	      .catch(err => console.log(err));
	}

	getMatches = radius => {
    	API.findMatches(userObj)
	      .then(res => {
	      	this.setState({ matches: res.data, userMatches: [], dogMatches: [] }, ()=>{
	      		console.log(res);
	      		this.state.matches.forEach(id => {
	      			console.log(id);
	      			let userObj = {userId: id.id};
	      			API.getUser(userObj)
				      .then(res => {
				      	if (res.data.dog && this.withinDist(radius, res.data.user.geoLocat.coordinates)) {
				      	    let userMatches = this.state.userMatches, dogMatches = this.state.dogMatches;
				      	    userMatches.push(res.data.user);
				      	    dogMatches.push(res.data.dog);
				      	    this.setState({userMatches, dogMatches});
				        }
				      })
				      .catch(err => console.log(err));
	      		});
	      	});
	      })
	      .catch(err => console.log(err));
	}

	withinDist = (radius, matchCoords) => {
		console.log("getting distance");
		let dist = geolib.getDistance(
		    {latitude: userCoords[0], longitude: userCoords[1]},
		    {latitude: matchCoords[0], longitude: matchCoords[1]}
		);
		return dist <= radius;
	}

	profileButton = () => {
	  	this.props.history.push('/profile')
	}

    render () {
        return (
            <div>
            	<button className="button" onClick={this.profileButton}>Edit My Profile!</button>
            	<Header><h3>Potential Matches</h3></Header>
            	<h5>Choose a New Match Range</h5>
            	<button onClick={()=>this.getMatches(8050)}>5 Miles</button>
            	<button onClick={()=>this.getMatches(16100)}>10 Miles</button>
            	<button onClick={()=>this.getMatches(24150)}>15 Miles</button>
            	<button onClick={()=>this.getMatches(32200)}>20 Miles</button>
            	<button onClick={()=>this.getMatches(40250)}>25 Miles</button>
            	<div className="wrapper">
	                {this.state && this.state.matches && 
	                	this.state.userMatches.map(user => (
			                <DiscoverCard
			                	key={user.id}
			                	user={user}
			                	userId={this.props.userId}
			                	dog={this.state.dogMatches.find(dog => dog.owner_id === user.id)}
			                />
	              		))
	                }
	            </div>
            </div>
        )
    }
}

export default Discover;