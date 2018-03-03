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
        this.handler = this.handler.bind(this);
      }

    handler(id) {
        this.setState({ userId: id });
        localStorage.setItem("userId", id);
        console.log(this.state.userId);
      }

    componentWillMount() {
        let userId = localStorage.getItem("userId");
        this.setState({ userId: userId ? userId : false })
      }

    logOut = () => {
        this.setState({ userId: '' });
        localStorage.setItem("userId", '');
        window.location.reload();
    }

    render() {
        return (
            <Router>
                <div>
                    <Header>
                        <h1>Dog "Tinder"</h1>
                        { this.state && this.state.userId &&
                            <button className="logout-btn" onClick={this.logOut}>Log Out</button>
                        }
                    </Header>
                    <Switch>
                        <Route exact path="/" render={props => <Form {...props} userId = {this.state.userId} handler = {this.handler} />} />
                        <Route path="/profile" render={props => <Profile {...props} userId = {this.state.userId} />} />
                        <Route path="/discover" render={props => <Discover {...props} userId = {this.state.userId} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
