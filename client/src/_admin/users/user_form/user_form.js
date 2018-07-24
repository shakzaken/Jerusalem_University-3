import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createUser ,clearErrors} from '../../../__actions/users_actions';
import Input from "../../../components/inputs/input_primary/input_primary";
import Select from "../../../components/inputs/select_primary/select_primary";
import Image from "../../../components/inputs/image_primary/image_primary";
import ButtonAdmin from "../../../components/buttons/button_admin/button_admin";


class addUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      role: "student",
      password: "",
      confirmPassword: "",
      image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  componentDidMount(){
    this.props.clearErrors();
  }
  
  handleSubmit(event) {
    event.preventDefault();
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    
    this.props.clearErrors();
    this.props.createUser(this.state,() => this.props.history.push('/admin/users'));
  }

  render() {
    const roleOptions = [
      {key: 'Student',value: 'student'},
      {key: 'Instructor',value: 'instructor'},
      {key: 'Admin',value: 'admin'}
    ];

    return (
      <div>
        <div className="admin-form">
          <form onSubmit={this.handleSubmit} className="app-form"  autoComplete="off">
            <h3 className="admin-form-header admin-form-header-fix">Add User</h3>
            <div className="admin-error-message">You are not Allowed to perform this action.</div>

            <Input
              label="First Name"
              name="firstName"
              value={this.state.firstName}
              error={this.props.errors.firstName}
              handleChange={this.handleChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={this.state.lastName}
              error={this.props.errors.lastName}
              handleChange={this.handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={this.state.email}
              error={this.props.errors.email}
              handleChange={this.handleChange}
            />
            <Select
              label="Role"
              name="role"
              value={this.state.role}
              error={this.props.errors.role}
              handleChange={this.handleChange}
              values={roleOptions}
            />
            <Input
              label="Password"
              name="password"
              value={this.state.password}
              error={this.props.errors.password}
              handleChange={this.handleChange}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              error={this.props.errors.confirmPassword}
              handleChange={this.handleChange}
            />
            <Image
              label="Image"
              name="image"
              id="user-image"
              error={this.props.errors.image}
              setImage = {(image) => this.setState({image})}
            />
            <div className="admin-form-button">
              <ButtonAdmin value="Add User"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


addUser.propTypes = {
  createUser: PropTypes.func.isRequired
}

function mapStateTopProps(state){
  return {
    errors: state.users.errors,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateTopProps,{createUser,clearErrors})(addUser);