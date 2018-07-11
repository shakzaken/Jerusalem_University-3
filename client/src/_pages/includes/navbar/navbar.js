import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.css';
import {logout} from '../../../__actions/auth_actions';





class Navbar extends Component {

  render() {
    return (
      <header className="main-header">
        <nav className="navbar">
          <div className="space-div"></div>
          <ul className="nav-left-ul">
            <Link className="medium-li" to="/">Home</Link>
            <Link className="big-li" to="/students">My Courses</Link>
            <Link className="medium-li" to="/admin">Admin</Link>
          </ul>
          {rightList(this.props)}
        </nav>
        <nav className="nav-logo">
          <h1>Jerusalem University</h1>
        </nav>
      </header>
    )
  }
}


const mapStateToProps = function(state){
  return {
    user: state.auth.user,
    token: state.auth.token
  };
}

export default connect(mapStateToProps,{logout})(Navbar);



function rightList(props){
  if(props.token){
    return logoutForm(props);
  }else {
    return loginForm(props);
  }
}

function loginForm(props){
  return (
    <ul className="nav-right-ul">
      <li className="medium-li">
        <Link className="" to="/login">Login</Link>
      </li>
      <li className="medium-li">
        <Link className="" to="/register">Register</Link>
      </li>
    </ul>
  )
}

function logoutForm(props){
  return (
  <ul className="nav-right-ul">
    <li className="navbar-email-li">
      <a href="">{props.user.email}</a>
    </li>
    <li className="medium-li">
        <Link 
        className="" 
        to="/"
        onClick={props.logout}>
          Logout
        </Link>
    </li>
  </ul>
  )
}

