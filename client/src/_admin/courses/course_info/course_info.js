import React, { Component } from "react";
import {connect} from 'react-redux';
import {startLoading,getTopics,deleteTopic,addTopic} from '../../../__actions/courses_actions';
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
    this.props.startLoading();
    this.props.getTopics(id);
  }

  deleteTopic(id){
    if(!window.confirm('Are you sure you want to delete this topic?')) { return }
    this.props.deleteTopic(id,() => this.props.getTopics(this.state.courseId));
  }

  handleSubmit(event){
    event.preventDefault();
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

    return (
      <div className = "admin-degree-info">
        <div className ="admin-table">
          <h1 className="admin-form-header admin-form-header-fix">
            {this.props.loading ? '': this.props.course.name}
          </h1>
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
        
        <div className="admin-form">
          <form onSubmit ={this.handleSubmit} className="app-form">
            <h3 className="admin-degree-info-header">Add Topic</h3>
            <Input 
             label="Topic"
             name="topic"
             value={this.state.name} 
             handleChange ={this.handleChange}/>
            <div class="admin-degree-info-button">
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
    loading: state.courses.loading
  }
}

export default connect(mapStateToProps,{startLoading,getTopics,deleteTopic,addTopic})(CourseInfo);




