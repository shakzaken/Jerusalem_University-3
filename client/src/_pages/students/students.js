import React, { Component } from "react";

import {connect} from 'react-redux';
import {startLoading,getStudentData} from '../../__actions/users_actions';
import CourseRow from './course_row/course_row';

class Students extends Component {
  constructor(props){
    super(props);
    
  }

  componentDidMount(){
    const id = this.props.authUser.id;
    if(!id){
      this.props.startLoading();
      this.props.history.push('/');
    }
    if(this.props.authUser.role!=='student'){
      this.props.startLoading();
      this.props.history.push('/');
    }
    
    this.props.startLoading();
    this.props.getStudentData(id);
  }

  

  render() {
    const loading = this.props.loading;
    const user = this.props.user;
    const degree = this.props.degree;
    const rows = this.props.courses.map(course => 
      <CourseRow key= {course.id} course = {course}/>
    )
    return (
      <div>
        <section class="section-i">
          <div class="i-container">
            <div class="i-grid">
              <div class="i-image-container">
                <img
                  class="i-image"
                  src={ loading ? '': user.image.body}
                  alt=""
                />
              </div>
              <div class="i-student-text">
                <strong>Name: </strong>
                 &nbsp;{ loading ? '': user.first_name} { loading ? '': user.last_name}
                 <br />
                <strong>Degree: </strong>&nbsp; {loading ? '': degree.full_name }<br />
                <strong>Email: </strong> &nbsp; {loading ? '': user.email}
              </div>
            </div>
          </div>
        </section>

        <section class="section-h">
          <div class="h-container">
            <h3 class="h-header">My Courses</h3>
            <br /> Register Now to one of our degrees, and get access to our
            courses. 
            <ul class="h-list">
              {rows}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}


const mapStateToProps = function(state){
  return{
    user: state.users.user,
    degree: state.users.degree,
    courses: state.users.courses,
    authUser: state.auth.user,
    loading: state.users.loading
  };
}

export default connect(mapStateToProps,{startLoading,getStudentData})(Students);

