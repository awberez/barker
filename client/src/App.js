import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import Profile from "./Components/Profile";
import Discover from "./Components/Discover";

class App extends Component {
    render() {

        return (
            <Router>
                <div>
                    <Header><h1>Dog "Tinder"</h1></Header>
                    <Switch>
                        <Route exact path="/" component={Form} />
                        <Route path="/profile/:userId" component={Profile} />
                        <Route path="/discover/:userId" component={Discover} />
                    </Switch>
                </div>
            </Router>
        );

    }
}
export default App;
