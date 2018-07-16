import React, { Component } from "react";

export default class text_area extends Component {
  render() {
    return (
      <div>
        <div className="text-area-group">
          <textarea
            name={this.props.name}
            id={this.props.id}
            value = {this.props.value}
            className="text-area"
            onChange = {this.props.handleChange}
            placeholder = {this.props.label}
          />
          <div className="err-msg">
            {this.props.error ? this.props.error : ""}
          </div>
        </div>
        
      </div>
    );
  }
}
