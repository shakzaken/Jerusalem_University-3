import React, { Component } from 'react';
import CourseComment from '../course_comment/course_comment';
import './course_comments.css';
import ButtonPrimary from '../../../components/buttons/button_primary/button_primary_submit';
import HeaderPrimary from '../../../components/headers/header_primary/header_primary';

export default class courseComments extends Component {
  render() {
    const comments = this.props.comments.map(comment =>
      <CourseComment key={comment.id} comment={comment} loading={this.props.loading} />
    );
    return (
      <div className="course-comments">
        
        <HeaderPrimary value="Course Comments" />
          {comments}
        <form 
          className="course-comments-form">
          <h3>Write a Comment</h3>
          <textarea name="body" id="" className="course-comments-form-body"></textarea>
          <ButtonPrimary value="Save" />
        </form>
      </div>
    )
  }
}
