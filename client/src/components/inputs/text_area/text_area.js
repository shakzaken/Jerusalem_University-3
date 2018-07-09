import React, { Component } from "react";

export default class text_area extends Component {
  render() {
    return (
      <div>
        <div className="form-group-large">
          <label htmlFor={this.props.id}>
            {this.props.label}
          </label>
          <textarea
            name={this.props.name}
            id={this.props.id}
            value = {this.props.value}
            className="text-area"
            onChange = {this.props.handleChange}
          />
        </div>
        <div className="err-msg">
        {this.props.error ? this.props.error : ""}
        </div>
      </div>
    );
  }
}
