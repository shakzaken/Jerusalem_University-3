import React, { Component } from "react";
import Input from "../../../components/inputs/input_primary/input_primary";
import Image from "../../../components/inputs/image_primary/image_primary";
import TextArea from '../../../components/inputs/text_area/text_area';
import ButtonAdmin from '../../../components/buttons/button_admin/button_admin';
import { createDegree,clearErrors } from '../../../__actions/degrees_actions';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';

class addDegree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fullName:"",
      points: "",
      description: "",
      image1:"",
      image2:"",
      image3:""  
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  handleChange(event) {
    let degree = this.state;
    degree[event.target.name] = event.target.value;
    this.setState({
      degree: degree
    });
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleSubmit(event) {
    this.props.clearErrors();
    this.props.createDegree(this.state, () => this.props.history.push('/admin/degrees'));
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <div className="admin-form">
          <form onSubmit = {this.handleSubmit}
          className="app-form" >
          <h3 className="admin-form-header admin-form-header-fix">Add Degree</h3>
            <Input
              label="Name"
              name="name"
              value={this.state.name}
              error={this.props.errors.name}
              handleChange={this.handleChange}
            />
            <Input
              label="Full Name"
              name="fullName"
              value={this.state.fullName}
              error={this.props.errors.fullName}
              handleChange={this.handleChange}
            />
            <Input
              label="Points"
              name="points"
              value={this.state.points}
              error={this.props.errors.points}
              handleChange={this.handleChange}
            />
            <TextArea
              value = {this.state.description}
              label = "Description"
              name="description" 
              id="degree-description"
              error = {this.props.errors.description}
              handleChange={this.handleChange}
            />
            
            <Image 
              label="First Image"
              name="image1"
              id="course-image-1"
              value={this.state.image1Str}
              error={this.props.errors.image1}
              setImage = {(image1) => this.setState({image1})}
            />
            <Image 
              label="Second Image"
              name="image2"
              id="course-image-2"
              value={this.state.image2Str}
              error={this.props.errors.image2}
              setImage = {(image2) => this.setState({image2})}
            />
            <Image 
              label="Third Image"
              name="image3"
              id="course-image-3"
              value={this.state.image3Str}
              error={this.props.errors.image3}
              setImage = {(image3) => this.setState({image3})}
            />
            <div className="admin-form-button">
              <ButtonAdmin value ="Add Degree"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


addDegree.propTypes = {
  createDegree: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.degrees.errors
  };
}

export default connect(mapStateToProps,{createDegree,clearErrors})(addDegree);