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
        this.state = {userId: ''};
        this.handler = this.handler.bind(this);
      }

    handler(id) {
        this.setState({ userId: id });
        console.log(this.state.userId);
      }

    render() {
        return (
            <Router>
                <div>
                    <Header><h1>Dog "Tinder"</h1></Header>
                    <Switch>
                        <Route exact path="/" render={props => <Form {...props} handler = {this.handler} />} />
                        <Route path="/profile" render={props => <Profile {...props} userId = {this.state.userId} />} />
                        <Route path="/discover" render={props => <Discover {...props} userId = {this.state.userId} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
