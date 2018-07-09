import React, { Component } from 'react';
import '../users.css';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.clearErrors();
    this.props.loginUser(this.state,
      () => this.props.history.push('/'));
    
  }

  

  render() {
    return (
      <div className="login-body">
        <div className="login-card">
          <div className="login-card-header">
            <h3>Login</h3>
          </div>
          <form className="login-form" onSubmit = {this.handleSubmit}>
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
            <input type="submit" value="Login" className="register-form-button userForm-btn" />
          </form>
          <div className="login-card-footer">
            <p>Jerusalem University</p>
          </div>
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
