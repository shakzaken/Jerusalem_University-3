import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getCourses,startLoading,deleteCourse } from '../../../__actions/courses_actions';
import {connect} from 'react-redux';
import CourseRow from '../course_row/course_row';


class courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      loading: true
    };
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
   this.props.startLoading();
   this.props.getCourses();
  }

  deleteCourse(id){
    if(!window.confirm('Are you sure you want to delete this course?')) return;
    this.props.deleteCourse(id, () => this.props.getCourses());
    
  }

  render() {

    const CoursesRows = this.props.courses.map(course => 
      <CourseRow 
      key={course.id} 
      course = {course} 
      loading={this.props.loading} 
      deleteCourse = {this.deleteCourse}/>
    );

    return (
      <div className="admin-table">
        <div className="admin-courses-header">
          <h2 className="admin-form-header admin-form-header-fix">Courses Table</h2>
        </div>
        
        <table>
          <thead>
            <tr>
              <th className="admin-table-medium-col">Picture</th>
              <th className="admin-table-big-col">Name</th>
              <th className="admin-table-big-col">Instructor</th>
              <th className="admin-table-medium-col">Field</th>
              <th className="admin-table-small-col">Points</th>
              <th className="admin-table-small-col">Id</th>
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
    courses: state.courses.coursesList
  };
}

export default connect(mapStateTopProps,{getCourses,deleteCourse,startLoading})(courses);