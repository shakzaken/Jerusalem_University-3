import React, { Component } from "react";
import {connect} from 'react-redux';


import Input from "../../../components/inputs/input_primary/input_primary";
import Select from "../../../components/inputs/select_primary/select_primary";
import Image from "../../../components/inputs/image_primary/image_primary";
import TextArea from '../../../components/inputs/text_area/text_area';
import ButtonAdmin from '../../../components/buttons/button_admin/button_admin';

import {getInstructors} from '../../../__actions/users_actions';
import {createCourse,clearErrors} from '../../../__actions/courses_actions';

class addCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        points: "",
        field: "",
        description: "",
        instructor: "",
        instructorId: "",
        image:""
      }
      
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
  }
    

  componentDidMount(){
    this.props.clearErrors();
    this.props.getInstructors(()=> {
        const instructor = this.props.instructors[0];
        this.setState({
        instructor : `${instructor.first_name} ${instructor.last_name}`,
        instructorId : instructor.id
      });
    }); 
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelectChange(event) {
    this.props.instructors.forEach(instructor => {
      if(instructor.id == event.target.value){
        this.setState({
          instructor : `${instructor.first_name} ${instructor.last_name}`,
          instructorId : instructor.id
        });
      }
    });
  }

  

  handleSubmit(event) {
    event.preventDefault();
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    this.props.clearErrors();
    this.props.createCourse(this.state, () => this.props.history.push('/admin/courses'));
  }

  render() {
    let instructorOptions = this.props.instructors
      .map(function(instructor){
        return {
          key: `${instructor.first_name}  ${instructor.last_name}`,
          value: instructor.id
        }
    });
        
    return (
      <div>
        
        <div className="admin-form">
          <form
            onSubmit = {this.handleSubmit}
            className="app-form"
          >
          <h3 className="admin-form-header admin-form-header-fix">Add Course</h3>
          <div className="admin-error-message">You are not allowed to perform this action</div>
            <Input
              label="Name"
              name="name"
              value={this.state.name}
              error={this.props.errors.name}
              handleChange={this.handleChange}
            />
            <Input
              label="Points"
              name="points"
              value={this.state.points}
              error={this.props.errors.points}
              handleChange={this.handleChange}
            />
            <Input
              label="Field"
              name="field"
              value={this.state.field}
              error={this.props.errors.field}
              handleChange={this.handleChange}
            />
            <Select
              label="Instructor"
              name="instructorId"
              value={this.state.instructorId}
              error={this.props.errors.instructor}
              handleChange={this.handleSelectChange}
              values={instructorOptions}
            />
 
            <TextArea
              value = {this.state.description}
              label = "Description"
              name="description" 
              id="course-description"
              error = {this.props.errors.description}
              handleChange={this.handleChange}
            />
            <Image 
              label="Image"
              name="image"
              id="course-image"
              value={this.state.imageStr}
              error={this.props.errors.image}
              setImage = {(image) => this.setState({image})}
            />
            <div className="admin-form-button">
              <ButtonAdmin value="Add Course" />
            </div>  
          </form>
        </div>
      </div>
    );
  }
}


addCourse.propTypes = {
  //createUser: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.courses.errors,
    instructors: state.users.instructors,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps,{getInstructors,createCourse,clearErrors})(addCourse);