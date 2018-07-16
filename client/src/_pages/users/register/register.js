import React, { Component } from 'react';
import Input from '../../../components/inputs/input_primary/input_primary';
import Image from '../../../components/inputs/image_primary/image_primary';
import '../users.css';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createUser,clearErrors} from '../../../__actions/users_actions';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      image: ''
    }
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.clearErrors();
    this.props.createUser(this.state,() => this.props.history.push('/login'));
  }

  render() {
    return (
      <div className="register-body">
        <div className="register-card">
          <div className="register-card-header">
            <h3>Register</h3>
          </div>
          <div className="register-form">
            <form onSubmit = {this.handleSubmit.bind(this)}>
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
               <Input
                label="email"
                value = {this.state.email}
                name = "email"
                handleChange = {(event) => this.setState({email: event.target.value})}
                error = {this.props.errors.email}
               />
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
               <Image
                label= "Image"
                value= {this.state.image}
                name = "image"
                id = "register-image"
                error = {this.props.errors.image}
                setImage = {(image) => this.setState({image})} 
               />
                      
              <input type="submit" value="Register" className="register-form-button userForm-btn" />
            </form>
          </div>
          <div className="register-card-footer">
            <p>Jerusalem University</p>
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





