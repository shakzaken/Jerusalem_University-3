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
              src={loading ? "": this.props.comment.body} 
              alt="" 
              className="course-comment-image"/>
          </div>
          <div className="course-comment-header">
            {`${this.props.comment.first_name} ${this.props.comment.last_name}`}
          </div>
          <div className="course-comment-icon-container">
            <a  
            className="course-comment-delete-icon"
            onClick={this.props.handleClick}>
            X
            </a>

          </div>
          
        </div>
        <div className="course-comment-body">
            {this.props.comment.comment_body}
        </div>
      </div>
    )
  }
}
