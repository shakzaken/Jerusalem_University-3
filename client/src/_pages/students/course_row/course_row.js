import React from "react";
import {Link} from 'react-router-dom';


export default  (props) => {
  const course = props.course;
  return (
    <li className="students-courses-list-item">
      <div className=".students-courses-image-container">
        <img
          className="students-courses-image"
          src={course.body}
          alt="course"
        />
      </div>
      <div className="students-courses-text">
        <h3>{course.name}</h3>
        <br />
        Instructor:&nbsp; {course.instructor}<br />
        Status:&nbsp; {course.status} <br />
        Grade:&nbsp; {course.grade == 0 ? '': course.grade}
      </div>
      <div className="students-courses-button-container">
        <Link
          className="button-secondary" 
          to ={`/courses/${course.id}`}>
        More info
        </Link>
      </div>
    </li>
  );
};
