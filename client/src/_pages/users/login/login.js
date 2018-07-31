import React, { Component } from 'react';
import Input from '../../../components/inputs/input_primary/input_primary';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser,clearErrors} from '../../../__actions/auth_actions';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'yakir@gmail.com',
      password:'1234'
    }
    
    this.exitClick = this.exitClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    
    
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  exitClick(event){

    if(event.target.className !=='users users-open' 
        && event.target.className!== 'users-card-exit') return;
    const login = document.getElementById("login");
    const loginCard = document.getElementById("login-card");
    login.classList.remove("users-open");
    loginCard.classList.remove("users-open-card");

    this.setState({
      email: '',
      password: ''
    });
    this.props.clearErrors();

  }

  loginClick(event){
    event.preventDefault();
    this.props.clearErrors();
    this.props.loginUser(this.state,() =>{
      this.setState({
        email: '',
        password: ''
      });
      const login = document.getElementById("login");
      const loginCard = document.getElementById("login-card");
      login.classList.remove("users-open");
      loginCard.classList.remove("users-open-card");
    });
  }


  render() {
    return (
      <div className="users" id="login" onClick={this.exitClick} ref={this.login}>
        <div className="users-card" id="login-card" >
          <a className="users-card-exit" >&times;</a>  
          <form className="users-card-form">
            <Input
            value= {this.state.email}
            handleChange = {(event) => this.setState({email: event.target.value})}
            name = "email"
            label = "Email"
            error = {this.props.errors.email}
            />
            <Input
            value= {this.state.password}
            handleChange = {(event) => this.setState({password: event.target.value})}
            name = "password"
            label = "Password"
            type = "password"
            error = {this.props.errors.password}
            />
            <div className="users-card-button-container">
              <a href="#" 
              className="users-card-button" 
              onClick = {this.loginClick}>Login</a>
            </div>
            
          </form>
         
        </div>
      </div>
   
    )
  }
}


const mapStateToProps = function(state){
  return {
    user: state.auth.user,
    errors: state.auth.errors
  };
}

export default connect(mapStateToProps,{loginUser,clearErrors})(Login);
