import React, { Component } from 'react';
import API from "../../utils/API";
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
	  	console.log(this.props.match);

	  }

    render () {
        return (
            <div className='flex-container flex-end flex-space'>
                <p>discover</p>
            </div>
        )
    }
}

export default Discover;