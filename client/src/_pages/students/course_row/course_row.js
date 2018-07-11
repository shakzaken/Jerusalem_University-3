import React from "react";
import {Link} from 'react-router-dom';

export default  (props) => {
  const course = props.course;
  return (
    <li class="h-list-item">
      <div class="h-image-container">
        <img
          class="h-image"
          src={course.body}
          alt="course"
        />
      </div>
      <div class="h-text">
        <h3>{course.name}</h3>
        <br />
        Instructor:&nbsp; {course.instructor}<br />
        Status:&nbsp; {course.status} <br />
        Grade:&nbsp; {course.grade == 0 ? '': course.grade}
      </div>
      <div class="button">
        <Link
          class="h-button" 
          to ={`/courses/${course.id}`}>
        More info
        </Link>
      </div>
    </li>
  );
};
