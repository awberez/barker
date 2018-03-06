import React, { Component } from 'react';
import API from "../../utils/API";
import DiscoverCard from "../DiscoverCard";
import Header from "../Header";
<<<<<<< HEAD
=======
import geolib from "geolib";
>>>>>>> b56c39eec29a535eb622f50d20d140457e4b8b4d
import './Discover.css';

let userCoords = [], userObj;

class Discover extends Component {
    constructor (props) {
        super(props);
        this.state = {
        	radius: 1610
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
<<<<<<< HEAD
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
=======
	        	userCoords = res.data.user.geoLocat.coordinates;
	        	this.getMatches(1610);
>>>>>>> b56c39eec29a535eb622f50d20d140457e4b8b4d
	        }
	      })
	      .catch(err => console.log(err));
	}
<<<<<<< HEAD
=======

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
		this.setState({radius});
		let dist = geolib.getDistance(
		    {latitude: userCoords[0], longitude: userCoords[1]},
		    {latitude: matchCoords[0], longitude: matchCoords[1]}
		);
		return dist <= radius;
	}
>>>>>>> b56c39eec29a535eb622f50d20d140457e4b8b4d

	profileButton = () => {
	  	this.props.history.push('/profile')
	}

    render () {
        return (
            <div>
            	<button className="button" onClick={this.profileButton}>Edit My Profile!</button>
            	<Header><h3>Potential Matches</h3></Header>
<<<<<<< HEAD
=======
            	<h5>Choose a New Match Range</h5>
            	<button disabled={this.state.radius === 1610} onClick={()=>this.getMatches(1610)}>1 Mile</button>
            	<button disabled={this.state.radius === 8050} onClick={()=>this.getMatches(8050)}>5 Miles</button>
            	<button disabled={this.state.radius === 16100} onClick={()=>this.getMatches(16100)}>10 Miles</button>
            	<button disabled={this.state.radius === 24150} onClick={()=>this.getMatches(24150)}>15 Miles</button>
            	<button disabled={this.state.radius === 40250} onClick={()=>this.getMatches(40250)}>25 Miles</button>
>>>>>>> b56c39eec29a535eb622f50d20d140457e4b8b4d
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