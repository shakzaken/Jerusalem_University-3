import React, { Component } from 'react';
import CourseHeader from './course_header/course_header';
import CourseContent from './course_content/course_content';
import CourseComments from './course_comments/course_comments';
import { connect } from 'react-redux';
import { startLoading , getCourseWithData } from '../../__actions/courses_actions';
import {addComment,deleteComment} from '../../__actions/comments_actions';

class CoursePage extends Component {

  constructor() {
    super();
    this.state = {
      course: {},
      comments: [],
      loading: true
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.startLoading();
    this.props.getCourseWithData(id);
    
  }

  handleSubmit(event,value){
    event.preventDefault();
    if(!this.props.user.id){
      console.log("user is not logged in")
      return;
    }
    const data = {
      userId : this.props.user.id,
      courseId: this.props.course.id,
      body: value
    };
    this.props.addComment(data,
      () => this.props.getCourseWithData(this.props.course.id));
    
  }

  handleClick(comment){
    if(comment.user_id != this.props.user.id ) { return };
    if(!window.confirm("Are you sure you want to delete this comment?")) { return; }
    this.props.deleteComment(comment.comment_id,() => this.props.getCourseWithData(this.props.course.id));
  }


  render() {
    const loading = this.props.comments.length === 0;
    
    return (
      <div>
        <CourseHeader course={this.props.course}
          loading={loading} />
        <section className="course-body">
          <div className="course-body-grid">
            <CourseContent topics={this.props.topics} loading={loading}
             description = {this.props.course.description} />
            <CourseComments 
            userId = {this.props.user.id}
            handleSubmit={this.handleSubmit.bind(this)} 
            handleClick ={this.handleClick.bind(this)}
            comments={this.props.comments} 
            loading={loading} />
          </div>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    course: state.courses.course,
    comments: state.courses.comments,
    topics: state.courses.topics,
    loading: state.courses.loading,
    user: state.auth.user
  };
}

export default connect(mapStateToProps,
  {startLoading,getCourseWithData,addComment,deleteComment})(CoursePage);
