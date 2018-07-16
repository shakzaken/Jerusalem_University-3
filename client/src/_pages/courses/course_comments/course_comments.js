import React, { Component } from 'react';
import CourseComment from '../course_comment/course_comment';
import ButtonPrimary from '../../../components/buttons/button_primary/button_primary_submit';
import HeaderSecondary from '../../../components/headers/header_secondary/header_secondary';

export default class courseComments extends Component {

  constructor(props){
    super(props);
    this.state = {
      comment : ''
    };

  }
  

  render() {
    const comments = this.props.comments.map(comment =>(
      <CourseComment 
        key={comment.comment_id} 
        comment={comment} 
        loading={this.props.loading} 
        handleClick = {() => this.props.handleClick(comment)}
        />
    ));
    return (
      <div className="course-comments">
        <HeaderSecondary value="Course Comments" />
          {comments}
        <form onSubmit = {(event) => this.props.handleSubmit(event,this.state.comment)}
          className="course-comments-form">
          <h3>Write a Comment</h3>
          <textarea 
            name="body" 
            className="course-comments-form-body"
            onChange = {event => this.setState({comment: event.target.value})}
            value = {this.state.value}
          />
          <ButtonPrimary value="Save" />
        </form>
      </div>
    )
  }
}
