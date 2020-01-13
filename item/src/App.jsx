import React, {Component} from 'react';
import { BrowserRouter as Router, Route ,Redirect} from 'react-router-dom'
import Login from './components/login';
import Home from './components/home'


export default class App extends Component {
    render(){
        return(
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Redirect to="/login"/>
            </Router>
        )
    }
}