import React, { Component } from 'react';


class ReactFormLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <label htmlFor={this.props.htmlFor}>{this.props.title}</label>;
    }
}

// name=WHATEVR value={this.state.WHATEVER} onChange={this.handleUserInput}

// class ReactForm extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             name: "",
//             email: "",
//             subject: "",
//             message: ""
//         };
//     }
//
//     handleChange = e => {
//         let newState = {};
//
//         newState[e.target.name] = e.target.value;
//
//         this.setState(newState);
//     };
//
//     handleSubmit = (e, message) => {
//         e.preventDefault();
//
//         let formData = {
//             formSender: this.state.name,
//             formEmail: this.state.email,
//             formSubject: this.state.subject,
//             formMessage: this.state.message
//         };
//
//         if (
//             formData.formSender.length < 1 ||
//             formData.formEmail.length < 1 ||
//             formData.formSubject.length < 1 ||
//             formData.formMessage.length < 1
//         ) {
//             return false;
//         }
//
//         this.setState({
//             firstName: "",
//             lastName: "",
//             email: "",
//             subject: "",
//             message: ""
//         });
//     };
// }

export default ReactFormLabel;