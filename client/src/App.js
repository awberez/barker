import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import Profile from "./Components/Profile";
import Discover from "./Components/Discover";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.handler = this.handler.bind(this);
      }

    handler(id, email) {
        console.log(email);
        this.setState({ userId: id, email: email });
        localStorage.setItem("userId", id);
        localStorage.setItem("email", email);
      }

    componentWillMount() {
        let userId = localStorage.getItem("userId"),
        email = localStorage.getItem("email");
        this.setState({ userId: userId ? userId : false, email: email ? email : false })
      }

    finishForm = () => {
        this.setState({ modal: true });
    }

    logOut = () => {
        this.setState({ userId: '' });
        localStorage.setItem("userId", '');
        localStorage.setItem("email", '');
        window.location.reload();
    }

    render() {
        return (
            <Router>
                <div>
                    <Header>
                        { this.state && this.state.userId &&
                            <span className="logout-btn">
                                <span className="logged-in-as">logged in as {this.state.email}</span>
                                <button onClick={this.logOut}>Log Out</button>
                            </span>
                        }
                    </Header>
                    <Switch>
                        <Route exact path="/" render={props => <Form {...props} modal={this.state.modal} userId={this.state.userId} handler={this.handler} />} />
                        <Route path="/profile" render={props => <Profile {...props} finishForm={this.finishForm} userId={this.state.userId} />} />
                        <Route path="/discover" render={props => <Discover {...props} finishForm={this.finishForm} userId={this.state.userId} />} />
                    </Switch>
                    { this.state && this.state.userId &&
                        <div className="background-color"></div>
                    }
                </div>
            </Router>
        );
    }
}
export default App;
