import React, { Component } from 'react';
import ButtonPrimary from '../../../components/buttons/button_primary/button_primary';


export default class CourseCard extends Component {
  render() {
    return (
      <div className="e-card">
        <div className="img-container">
          <img className="e-card-img"  alt="course"
          src={this.props.course.body}  />
        </div>
        <div className="e-card-body">
          <div className="e-card-header">
            {this.props.course.name}
          </div>
          <div className="e-card-text">
            {this.props.course.instructor}
            <br />
          </div>
        </div>
        <div className="e-btn-container">
          <ButtonPrimary to={`/courses/${this.props.course.id}`} value="More Details"/>
        </div>
      </div>
    )
  }
}
