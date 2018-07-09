import React, { Component } from "react";
import '../input_shared.css';
import "./select_primary.css";

export default class Select extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.handleChange(event);
  }

  render() {
    const options = this.props.values.map(option => 
      <option 
        value = {option.value}
        key ={option.key}>
          {option.key}
      </option>
    )

    return (
      <div>
        <div className="form-group">
          <label htmlFor="role">{this.props.label}</label>
          <select
            name={this.props.name}
            id={this.props.name}
            className="userForm"
            onChange={this.handleChange}
            value={this.props.value}
          >
            {options}
          </select>
        </div>
        <div className="err-msg">
          {this.props.error ? this.props.error : ""}
        </div>
      </div>
    );
  }
}
