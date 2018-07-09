import React, { Component } from 'react';
import './course_content.css';
import HeaderPrimary from '../../../components/headers/header_primary/header_primary';

export default class courseContent extends Component {
  render() {
    const loading = this.props.loading;
    const topics = loading ? '' : this.props.topics.map((topic) =>
      <li key={topic.id} className="course-content-row">
        <i className="fas fa-arrow-circle-right course-content-icon"></i>
        &nbsp; {topic.name}
      </li>
    );
    return (
      <div className="course-content">
        <div className="course-content-header">
          <HeaderPrimary value ="Course Content" />
        </div>
        <ul className="course-content-body">
          {topics}
        </ul>
      </div>
    )
  }
}
