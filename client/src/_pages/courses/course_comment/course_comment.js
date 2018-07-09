import React, { Component } from 'react';
import './course_comment.css';

export default class CourseComment extends Component {
  render() {
    const loading = this.props.loading;
    return (
      <div className="course-comment">
        <div className="course-comment-grid">
          <div className="course-comment-container">
            <img 
              src={loading ? '' : this.props.comment.image.body} 
              alt="" 
              className="course-comment-image"/>
          </div>
          <div className="course-comment-header">
            {`${this.props.comment.user.first_name} ${this.props.comment.user.last_name}`}
          </div>
          <div className="course-comment-icon-container">
            <a href="" class="course-comment-delete-icon">X</a>
              
            
          </div>
          
        </div>
        <div className="course-comment-body">
            {this.props.comment.body}
        </div>
      </div>
    )
  }
}
