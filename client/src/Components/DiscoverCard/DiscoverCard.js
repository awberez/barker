import React from "react";
import "./DiscoverCard.css";

const DiscoverCard = props => (          
	<div className="card">
	    <div className="img-container">
	      <img alt={props.dog_name} src={props.user.image}/>
	    </div>
	    <div className="content">
	      <h3>{props.user.fname} {props.user.lname} and {props.dog.dog_name}</h3>
	      <p>{props.user.owner_profile}</p>
	      <ul>
	        <li>
	          <strong>Breed:</strong> {props.dog.breed}
	        </li>
	        <li>
	          <strong>Sex:</strong> {props.dog.sex}
	        </li>
	        <li>
	          <strong>Age:</strong> {props.dog.age}
	        </li>
	        <li>
	          <strong>Size:</strong> {props.dog.size}
	        </li>
	        <li>
	          <strong>Demeanor:</strong> {props.dog.demeanor}
	        </li>
	      </ul>
	    </div>
	    <button className="match-btn" onClick={() => props.matchBtn(props.user.id)}>Match!</button>
  	</div>
);

export default DiscoverCard;