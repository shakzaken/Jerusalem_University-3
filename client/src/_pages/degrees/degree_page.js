import React, { Component } from 'react';
import CourseCard from './course_card/course_card';
import DegreeHeader from './degree_header/degree_header';
import ButtonSeconday  from '../../components/buttons/button_secondary/button_secondary';
import HeaderPrimary from '../../components/headers/header_primary/header_primary';
import {connect} from 'react-redux';
import {getDegreeWithCourses,startLoading} from '../../__actions/degrees_actions';
import {registerStudent} from '../../__actions/users_actions';


class DegreePage extends Component {

  constructor() {
    super();

    this.state = {
      degree: {},
      courses: [],
      loading: true
    }

  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.startLoading();
    this.props.getDegreeWithCourses(id);
 
  }

  registerStudent(){
    if(!window.confirm('Are you sure you want to register to this degree?')) { return; }
    if(!this.props.user.id) { return; }
    const data = {
      userId : this.props.user.id,
      degreeId : this.props.match.params.id
    };
    this.props.registerStudent(data,
      () => this.props.history.push(`/students`));
  }

  render() {


    const coursesCards = this.props.courses.map((course) =>
      <CourseCard key={course.id} course={course} />
    );
    return (
      <div>
        <section className="degree-first">
          <div class="degree-first-title">
              <HeaderPrimary value={this.props.degree.name} />
              <div className="degree-first-button">
                <ButtonSeconday name ="Enroll Now" 
                  handleClick={this.registerStudent.bind(this)} />
              </div>
          </div>
          <DegreeHeader degree={this.props.degree} loading={this.props.loading} />
        </section>


        <section className="degree-info">
          <div className="degree-info-container">
            <p><strong>Degree: </strong>{this.props.degree.name}</p><br />
            <p><strong>Points: </strong> {this.props.degree.points}</p><br />
            <p><strong>Courses: </strong>{this.props.courses.length}</p><br />
            <p><strong>Description: </strong><br /> {this.props.degree.description} </p>

          </div>
        </section>


        <section className="degree-courses">
          <div class="degree-courses-container">
            <HeaderPrimary value="Academic Courses"/>
          </div>
          <div className="degree-courses-grid">
            {coursesCards}
          </div>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    degree: state.degrees.degree,
    courses: state.degrees.courses,
    loading: state.degrees.pageLoading,
    user: state.auth.user
  };
}


export default connect(mapStateToProps,
  {startLoading,getDegreeWithCourses,registerStudent})(DegreePage);