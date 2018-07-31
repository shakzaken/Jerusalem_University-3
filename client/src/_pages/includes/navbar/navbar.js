import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../../__actions/auth_actions';





class Navbar extends Component {

  


  rightList(){
    if(this.props.token){
      return this.logoutForm(this.props);
    }else {
      return this.loginForm(this.props);
    }
  }

  loginLink(){
    const login = document.getElementById("login");
    const loginCard = document.getElementById("login-card");
    login.classList.add('users-open');
    loginCard.classList.add('users-open-card');
  }
  registerLink(){
    const register = document.getElementById("register");
    const registerCard = document.getElementById("register-card");
    register.classList.add('users-open');
    registerCard.classList.add('users-open-card');
  }

  loginForm(){
    return (
      <ul className="navbar-ul navbar-ul-right">
        <a className="navbar-link navbar-link-medium" onClick={this.loginLink}>Login</a>
        <a className="navbar-link navbar-link-medium" onClick={this.registerLink}>Register</a>
      </ul>
    )
  }
  
  logoutForm(){
    return (
    <ul className="navbar-ul navbar-ul-right">
        <a href="#" className="navbar-link navbar-link-email">{this.props.user.email}</a>
          <Link 
          className="navbar-link navbar-link-medium" 
          to="/"
          onClick={this.props.logout}>
            Logout
          </Link>
    </ul>
    )
  }



  render() {
    return (
      <header className="main-header" >
        <nav className="navbar" id="navbar">
          <ul className="navbar-ul navbar-ul-left">
            <Link className="navbar-link navbar-link-medium" to="/">Home</Link>
            <Link className="navbar-link navbar-link-big" to="/students">My Courses</Link>
            <Link className="navbar-link navbar-link-medium" to="/admin">Admin</Link>
          </ul>
          {this.rightList()}
        </nav>
        <nav className="navbar-logo">
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







