import React, { Component } from "react";
import {connect} from 'react-redux';
import {getTopics,deleteTopic,addTopic} from '../../../__actions/courses_actions';
import AdminButton from '../../../components/buttons/button_admin/button_admin';
import Input from '../../../components/inputs/input_primary/input_primary';

class CourseInfo extends Component {

  constructor(props){
    super(props);
    this.state ={
      courseId:'',
      name:''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    this.setState({courseId:id});
    this.props.getTopics(id);
  }

  deleteTopic(id){
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    if(!window.confirm('Are you sure you want to delete this topic?')) { return }
    this.props.deleteTopic(id,() => this.props.getTopics(this.state.courseId));
  }

  handleSubmit(event){
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
    this.props.addTopic(this.state,() => this.props.getTopics(this.state.courseId));
    this.setState({name:''});
  }

  handleChange(event){
    this.setState({
      name: event.target.value
    });
  }

  render() {

    const rows = this.props.topics.map(topic =>
      <tr key={topic.id}>
        <td>{topic.id}</td>
        <td>{topic.name}</td>
        <td>
          <a className="text-center"  
          onClick={() => this.deleteTopic(topic.id)}>
            <i className="fa fa-trash delete-icon" />
          </a>
        </td>
      </tr>
    );

    const loading = this.props.course.name ? false : true;
    return (

      <div className = "admin-degree-info">
        <div className ="admin-table">
          <h1 className="admin-form-header admin-form-header-fix">
            {loading ? '': this.props.course.name}
          </h1>
          <div className="admin-error-message">You are not allowed to perform this action</div>
          <table className="admin-degrees-table">
            <thead>
              <tr>
                <th className="admin-table-small-col">Id</th>
                <th className="admin-table-big-col">Name</th>
                <th className="admin-table-small-col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        <div className="admin-degree-info-space"></div>
        <div className="admin-form">
          <form onSubmit ={this.handleSubmit} className="app-form">
            <h3 className="admin-degree-info-header">Add Topic</h3>
            <Input 
             label="Topic"
             name="name"
             value= {this.state.name} 
             handleChange = {this.handleChange}
             error={this.props.errors.name}/>
            <div className="admin-degree-info-button">
              <AdminButton value="Add Topic" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}



const mapStateToProps = function(state){
  return{
    topics: state.courses.topics,
    course: state.courses.course,
    isAdmin: state.auth.isAdmin,
    errors: state.courses.errors
  }
}

export default connect(mapStateToProps,{getTopics,deleteTopic,addTopic})(CourseInfo);




