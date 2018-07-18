import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getDegreeWithCourses,
  startLoading,
  addCourseToDegree,
  deleteCourseFromDegree
} from "../../../__actions/degrees_actions";
import {getCourses} from '../../../__actions/courses_actions';
import Select from '../../../components/inputs/select_primary/select_primary';
import AdminButton from '../../../components/buttons/button_admin/button_admin';



class DegreeInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      degreeId : '',
      courseId :  ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({degreeId : id});
    this.props.startLoading();
    this.props.getDegreeWithCourses(id,true);
    this.props.getCourses(() => this.setState({courseId:this.props.courses[0].id}));
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addCourseToDegree(this.state,
      () => this.props.getDegreeWithCourses(this.state.degreeId));
    console.log(this.state);
  }

  handleClick(id){
    if(!window.confirm('Are you sure you want to delete this course?')) return;
    this.props.deleteCourseFromDegree(id,
      ()=> this.props.getDegreeWithCourses(this.state.degreeId));
  }
 
  render() {
    const rows = this.props.courses.map(course => (
      <tr key={course.id}>
        <td>{course.id}</td>
        <td>{course.name}</td>
        <td>
          <a className="text-center" 
          onClick = {() => this.handleClick(course.dc_id)}>
            <i className="fa fa-trash delete-icon" />
          </a>
        </td>
      </tr>
    ));
    
   

    const options = this.props.allCourses.map(course => {
      return {
        key: course.name,
        value: course.id  
      };
    });
 
    

    return (
      <div className="admin-degree-info">
        <div className="admin-degree-info-body admin-table">
          <div className="admin-degree-info-header">
            <h1 className="admin-form-header">
              {this.props.loading ? "" : this.props.degree.name}
            </h1>
          </div>
          
          <table className="admin-degree-info-table">
            <thead>
              <tr>
                <th className="admin-table-small-col">Id</th>
                <th className="admin-table-medium-col">Name</th>
                <th className="admin-table-small-col">Delete</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
        

        
        <div className="admin-degree-info-add admin-form">
          
          <form onSubmit ={this.handleSubmit} className="app-form">
            <h2 className="admin-degree-info-header">Add course </h2> 
            <Select 
              id="selectCourse" 
              handleChange = {(event) => this.setState({courseId: event.target.value})}
              value = {this.state.courseId} 
              label = "Course"
              values= {options} /> 
           
            <div class="admin-degree-info-button">
              <AdminButton value ="Add Course"/>
            </div>
             
          </form>
        </div>
      </div>
    );
  }
}

DegreeInfo.propTypes = {
  getDegreeWithCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateTopProps(state) {
  return {
    courses: state.degrees.courses,
    degree: state.degrees.degree,
    allCourses : state.courses.coursesList,
    loading: state.degrees.loading
  };
}

export default connect(
  mapStateTopProps,
  { 
    getDegreeWithCourses,
    startLoading,
    getCourses,
    addCourseToDegree,
    deleteCourseFromDegree 
  })(DegreeInfo);

