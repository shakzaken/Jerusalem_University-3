import React, { Component } from "react";
import '../input_shared.css';
import './input_primary.css';

export default class Input extends Component {
  
  render() {
    let type = "text";
    if(this.props.name ==='password' || 
       this.props.name === 'confirmPassword'){
        type = "password";
      }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="firstName">{this.props.label}</label>
          <input
            type={type}
            name = {this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
          />
        </div>
        <div className="err-msg">
          {this.props.error ? this.props.error : ""}
        </div>
      </div>
    );
  }
}
