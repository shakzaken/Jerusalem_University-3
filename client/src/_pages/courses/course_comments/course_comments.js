import React, { Component } from 'react';
import CourseComment from '../course_comment/course_comment';
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
        userId = {this.props.userId}
        />
    ));
    return (
      <div className="course-comments">
        <div className="course-comments-header">
          <HeaderSecondary value="Course Comments"/>
        </div>
        
          {comments}
        <form onSubmit = {(event) => this.props.handleSubmit(event,this.state.comment)}
          className="course-comments-form">

          <h3 className="course-comments-form-header">Write a Comment</h3>
          <textarea 
            name="body" 
            className="course-comments-form-body"
            onChange = {event => this.setState({comment: event.target.value})}
            value = {this.state.value}
          />
    
            <button className="course-comments-form-button">Save</button>
        
          
        </form>
      </div>
    )
  }
}
