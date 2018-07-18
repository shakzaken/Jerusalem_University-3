import React, { Component } from "react";

export default class Input extends Component {
  
  render() {
    let type = "text";
    if(this.props.name ==='password' || 
       this.props.name === 'confirmPassword'){
        type = "password";
      }

    return (
      <div className="form-group">
        <div >
          <label className="form-label" htmlFor="firstName">{this.props.label}</label>
          <input
            className ="form-input"
            type={type}
            name = {this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
            placeholder = {this.props.label}
            autoComplete = "off"
          />
        </div>
        <div className="form-err-msg err-msg">
          {this.props.error ? this.props.error : ""}
        </div>
      </div>
    );
  }
}
