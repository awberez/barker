import React, { Component } from 'react';
import API from "../../utils/API";
import './Discover.css';

class Discover extends Component {
    constructor (props) {
        super(props);
        this.state = {
        	userMatches: [],
        	dogMatches: []
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
			      	this.setState({ matches: res.data.matches }, ()=>{
			      		this.state.matches.forEach(id => {
			      			let userObj = {userId: id};
			      			API.getUser(userObj)
						      .then(res => {
						      	if (res.data.dog) {
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
	      })
	      .catch(err => console.log(err));
	}

    render () {
        return (
            <div className='flex-container flex-end flex-space'>
                {this.state.userMatches.map(user => (
                <p>{user.fname}</p>
              ))}
            </div>
        )
    }
}

export default Discover;