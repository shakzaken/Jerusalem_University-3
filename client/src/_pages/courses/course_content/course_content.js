import React, { Component } from 'react';
import HeaderSecondary from '../../../components/headers/header_secondary/header_secondary';

export default class courseContent extends Component {
  render() {
    const loading = this.props.loading;
    const topics = loading ? '' : this.props.topics.map((topic) =>
      <li key={topic.id} className="course-content-row">
        <div className="course-content-container">
          <i className="fas fa-arrow-circle-right course-content-icon"></i>
        </div>
        <div className ="course-content-text">
        {topic.name}
        </div>
        
      </li>
    );
    return (
      <div>
        <div className="course-content">
          <div className="course-content-header">
            <HeaderSecondary value="Course Content" />
          </div>
            <ul className="course-content-body">
              {topics}
            </ul>
        </div>
        <div className="course-overview">
          <div className="course-overview-header">
            <HeaderSecondary value="Course Overview" />
          </div>
          <div className="course-overview-body">
            {this.props.description}
          </div>
          
        </div>
      </div>
    )
  }
}
