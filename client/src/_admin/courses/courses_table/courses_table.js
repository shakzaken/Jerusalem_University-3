import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getCourses,deleteCourse } from '../../../__actions/courses_actions';
import {connect} from 'react-redux';
import CourseRow from '../course_row/course_row';
import {Link} from 'react-router-dom';


class courses extends Component {
  constructor() {
    super();
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
   this.props.getCourses();
  }

  deleteCourse(id){
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-table-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    if(!window.confirm('Are you sure you want to delete this course?')) return;
    this.props.deleteCourse(id, () => this.props.getCourses());
  }

  render() {

    const CoursesRows = this.props.courses.map(course => 
      <CourseRow 
      key={course.id} 
      course = {course} 
      deleteCourse = {this.deleteCourse}/>
    );

    return (
      <div className="admin-table admin-courses-table">
        <div className="admin-courses-table-header">
          <h2 className="admin-form-header admin-form-header-fix">Courses Table</h2>
          <Link to="/admin/courses/add" className="admin-courses-table-icon">
             <i class="fas fa-plus-circle "></i>
          </Link>
          <div className="admin-table-error-message">You are not allowed to perform this action</div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th className="admin-table-medium-col">Picture</th>
              <th className="admin-table-big-col">Name</th>
              <th className="admin-table-big-col">Instructor</th>
              <th className="admin-table-medium-col hide-on-phone">Field</th>
              <th className="admin-table-small-col hide-on-phone">Points</th>
              <th className="admin-table-small-col hide-on-phone">Id</th>
              <th className="admin-table-small-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {CoursesRows}
          </tbody>
        </table>
      </div>
    );
  }
}


courses.propTypes = {
  getCourses : PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
}

function mapStateTopProps(state){
  return {
    courses: state.courses.coursesList,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateTopProps,{getCourses,deleteCourse})(courses);