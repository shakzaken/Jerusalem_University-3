import React, { Component } from 'react';
import Input from '../../../components/inputs/input_primary/input_primary';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser,clearErrors} from '../../../__actions/auth_actions';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleClick(event){
    
    this.props.clearErrors();
    this.props.loginUser(this.state,
      () => this.props.history.push('/'));
    this.setState({email:'',password:''});
  }

  

  render() {
    return (
      <div className="login" id="login">
        <div className="login-card" >
          <a className="login-card-exit" href="#">&times;</a>  
          <form className="login-card-form">
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
            <a href="#" 
            className="register-form-button userForm-btn" 
            onClick = {this.handleClick}>Login</a>
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
