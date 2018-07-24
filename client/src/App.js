import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminPanel from './_admin/panel';
import Layout from './_pages/layout';
import {connect} from 'react-redux';
import {initAuthUser} from './__actions/auth_actions';


class App extends Component {

  componentDidMount(){
    this.props.initAuthUser();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch> 
            <Route path="/admin" component={AdminPanel} />
            <Route path="/" component={Layout} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default connect(null,{initAuthUser})(App);
