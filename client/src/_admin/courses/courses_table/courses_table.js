import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getCourses,startLoading,deleteCourse } from '../../../__actions/courses_actions';
import {connect} from 'react-redux';
import CourseRow from '../course_row/course_row';
import './courses_table.css';

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
      <div>
        <h2 className="admin-courses-header">Courses Table</h2>

        <table className="admin-courses-table">
          <thead>
            <tr>
              <th className="admin-courses-medium-col">Picture</th>
              <th className="admin-courses-big-col">Name</th>
              <th className="admin-courses-big-col">Instructor</th>
              <th className="admin-courses-medium-col">Field</th>
              <th className="admin-courses-small-col">Points</th>
              <th className="admin-courses-small-col">Id</th>
              <th className="admin-courses-small-col">Delete</th>
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