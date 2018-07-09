import React, { Component } from "react";
import {connect} from 'react-redux';
import {startLoading,getTopics,deleteTopic,addTopic} from '../../../__actions/courses_actions';

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
      <div>
        <a href="#" className="admin-form-link">
          Add Topic
        </a>
        <h1 className="admin-degrees-header">
          {this.props.loading ? '': this.props.course.name}
        </h1>
        <table className="admin-degrees-table">
          <thead>
            <tr>
              <th className="admin-courses-small-col">Id</th>
              <th className="admin-courses-big-col">Name</th>
              <th className="admin-courses-small-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <h3 className="admin-degrees-header">course name</h3>
        <div className="admin-form">
          <form onSubmit ={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="selectCourse">topic</label>
              <input type="text" className="" name="topic" value={this.state.name}
              onChange = { this.handleChange} />
            </div>
            <input type="submit" value="Add Topic" className="admin-form-button" />
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




