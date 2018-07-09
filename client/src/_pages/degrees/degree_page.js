import React, { Component } from 'react';
import './degree_page.css';
import axios from 'axios';
import { Config } from '../../config/config';
import CourseCard from './course_card/course_card';
import DegreeHeader from './degree_header/degree_header';
import ButtonSeconday  from '../../components/buttons/button_secondary/button_secondary';
import HeaderPrimary from '../../components/headers/header_primary/header_primary';


export default class DegreePage extends Component {

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

    axios.get(`${Config.serverUrl}/degrees/${id}`)
      .then(res => {
        this.setState({
          degree: res.data.degree,
          courses: res.data.courses,
          loading: false
        });

      })
      .catch(err => console.log(err));
  }


  render() {


    const coursesCards = this.state.courses.map((course) =>
      <CourseCard key={course.id} course={course} />
    );
    return (
      <div>
        <section className="degree-first">
          <div class="degree-first-title">
              <HeaderPrimary value={this.state.degree.name} />
              <div className="degree-first-button">
                <ButtonSeconday name ="Enroll Now" />
              </div>
          </div>
          <DegreeHeader degree={this.state.degree} loading={this.state.loading} />
        </section>


        <section className="degree-info">
          <div className="degree-info-container">
            <p><strong>Degree: </strong>{this.state.degree.name}</p><br />
            <p><strong>Points: </strong> {this.state.degree.points}</p><br />
            <p><strong>Courses: </strong>{this.state.courses.length}</p><br />
            <p><strong>Description: </strong><br /> {this.state.degree.description} </p>

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
