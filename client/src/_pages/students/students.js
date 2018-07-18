import React, { Component } from "react";

import {connect} from 'react-redux';
import {startLoading,getStudentData} from '../../__actions/users_actions';
import CourseRow from './course_row/course_row';
import Header from '../../components/headers/header_primary/header_primary';


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
    
    const loading = this.props.user.image ? false : true;
    const user = this.props.user;
    
    const degree = this.props.degree;
    const rows = this.props.courses.map(course => 
      <CourseRow key= {course.id} course = {course}/>
    )
    return (
      <div>
        <section class="students-header">
          <div class="students-header-container">
            <div class="students-header-grid">
              <div class="students-header-image-container">
                <img
                  class="students-header-image"
                  src={ loading ? '': user.image.body}
                  alt=""
                />
              </div>
              <div class="students-header-text">
                
                 <h2 className="students-header-text-main">
                  { loading ? '': user.first_name} { loading ? '': user.last_name}
                 </h2><br/>
                <strong>Degree: </strong>&nbsp; {loading ? '': degree.full_name }<br />
                <strong>Email: </strong> &nbsp; {loading ? '': user.email}
              </div>
            </div>
          </div>
        </section>

        <section class="students-courses">
          <div class="students-courses-container">
            
            <div class="students-courses-header">
              <Header value="My Courses"/>
            </div>
            <br /> 
            <ul class="students-courses-list">
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

