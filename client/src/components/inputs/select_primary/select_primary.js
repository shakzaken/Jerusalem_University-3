import React, { Component } from "react";


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
          <label 
          className="select-input-label" 
          htmlFor="role">{this.props.label}</label>
          <select 
            className = "select-input"
            name={this.props.name}
            id={this.props.name}
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
