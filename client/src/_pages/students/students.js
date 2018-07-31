import React, { Component } from "react";
import {connect} from 'react-redux';
import {getStudentData} from '../../__actions/users_actions';
import CourseRow from './course_row/course_row';
import Header from '../../components/headers/header_primary/header_primary';


class Students extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    const id = this.props.authUser.id;
    if(!id){
      this.props.history.push('/');
    }
    if(this.props.authUser.role!=='student'){
      this.props.history.push('/');
    }
    
    this.props.getStudentData(id,() =>{
      this.setState({loading: false});
    });
  }

  

  render() {
    
    const loading = this.state.loading;
    const user = this.props.user;
    const degree = this.props.degree;
    const rows = this.props.courses.map(course => 
      <CourseRow key= {course.id} course = {course}/>
    )
    return (
      <div>
        <section className="students-header">
          <div className="students-header-container">
            <div className="students-header-grid">
              <div className="students-header-image-container">
                <img
                  className="students-header-image"
                  src={ loading ? '': user.image.body}
                  alt=""
                />
              </div>
              <div className="students-header-text">
                
                 <h2 className="students-header-text-main">
                  { loading ? '': user.first_name} { loading ? '': user.last_name}
                 </h2><br/>
                <strong>Degree: </strong>&nbsp; {loading ? '': degree.full_name }<br />
                <strong>Email: </strong> &nbsp; {loading ? '': user.email}
              </div>
            </div>
          </div>
        </section>

        <section className="students-courses">
          <div className="students-courses-container">
            
            <div className="students-courses-header">
              <Header value="My Courses"/>
            </div>
            <br /> 
            <ul className="students-courses-list">
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
    authUser: state.auth.user
  };
}

export default connect(mapStateToProps,{getStudentData})(Students);

