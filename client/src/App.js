import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminPanel from './_admin/panel';
import Layout from './_pages/layout';
import store from './store';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch> 
              <Route path="/admin" component={AdminPanel} />
              <Route path="/" component={Layout} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
