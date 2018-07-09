import React, { Component } from 'react';
import axios from 'axios';
import { Config } from '../../config/config';
import CourseHeader from './course_header/course_header';
import CourseContent from './course_content/course_content';
import CourseComments from './course_comments/course_comments';
import './course_page.css';

export default class coursePage extends Component {

  constructor() {
    super();
    this.state = {
      course: {},
      comments: [],
      loading: true
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
      axios.get(`${Config.serverUrl}/courses/${id}`)
        .then(res => {
          this.setState({
            course: res.data.course,
            comments: res.data.comments,
            loading: false
          });
          console.log(res.data.comments);
        })
        .catch(err => console.log(err));
  }


  render() {
    const loading = this.state.loading;
    return (
      <div>
        <CourseHeader course={this.state.course}
          loading={loading} />
        <section className="course-body">
          <div className="course-body-grid">
            <CourseContent topics={this.state.course.topics} loading={loading} />
            <CourseComments comments={this.state.comments} loading={loading} />
          </div>
        </section>
      </div>

    )
  }
}
