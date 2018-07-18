import React, { Component } from 'react';
import Input from '../../../components/inputs/input_primary/input_primary';
import Image from '../../../components/inputs/image_primary/image_primary';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createUser,clearErrors} from '../../../__actions/users_actions';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: 'yakir',
      lastName: 'zak',
      email: 'yakir@gmail.com',
      password: '1234',
      confirmPassword: '1234',
      role: 'student',
      image: ''
    }
    
    this.exitClick = this.exitClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  exitClick(event){

    if(event.target.className !=='login' 
        && event.target.className!== 'login-card-exit') return;
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      image: ''
    });
    window.location.assign('/#');
    this.props.clearErrors();

  }

  registerClick(event){
    event.preventDefault();
    this.props.clearErrors();
    this.props.createUser(this.state,() => window.location.assign('/#'));
    
  }

  render() {
    return (
      <div className="login" id="register" onClick={this.exitClick}>
        <div className="login-card register-card">
          <div className="">
          <a className="login-card-exit" href="#">&times;</a>
            <form className="login-card-form" >
              <div className="users-form-group u-height-6">
                <Input
                  label="First Name"
                  value = {this.state.firstName}
                  name = "firstName"
                  handleChange = {(event) => this.setState({firstName: event.target.value})}
                  error = {this.props.errors.firstName}
                />
                <Input
                  label="Last Name"
                  value = {this.state.lastName}
                  name = "lastName"
                  handleChange = {(event) => this.setState({lastName: event.target.value})}
                  error = {this.props.errors.lastName}
                />
              </div>
              <div className="users-form-group u-height-6">
                <Input
                  label="password"
                  value = {this.state.password}
                  name = "password"
                  handleChange = {(event) => this.setState({password: event.target.value})}
                  error = {this.props.errors.password}
                />
                <Input
                  label="Confirm password"
                  value = {this.state.confirmPassword}
                  name = "confirmPassword"
                  handleChange = {(event) => this.setState({confirmPassword: event.target.value})}
                  error = {this.props.errors.confirmPassword}
                />
              </div>
               <Input
                label="email"
                value = {this.state.email}
                name = "email"
                handleChange = {(event) => this.setState({email: event.target.value})}
                error = {this.props.errors.email}
               />
              <div className="register-card-image-container">
                <Image
                    label= "Image"
                    value= {this.state.image}
                    name = "image"
                    id = "register-image"
                    error = {this.props.errors.image}
                    setImage = {(image) => this.setState({image})} 
                    color = "primary"
                  />
                  <div className="register-card-button-container">
                    <a href="#" 
                    className="login-card-button" 
                    onClick = {this.registerClick}>Register</a>
                  </div>
              </div>
                
                  
             
                
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  return {
    errors: state.users.errors
  };
}


export default connect(mapStateToProps,{clearErrors,createUser})(Register);





