import React from "react";
import {Link} from 'react-router-dom';

export default props => {
  
  return (
    <tr>
      <td>
        <img
          className="course-image"
          src={props.loading ? "" :  props.course.image.body}
          alt="course"
        />
      </td>
      <td>
        <Link to={`/admin/courses/${props.course.id}`}>
          {props.course.name}
        </Link>
      </td>
      <td>{props.course.instructor}</td>
      <td>{props.course.field}</td>
      <td>{props.course.points}</td>
      <td>{props.course.id}</td>
      <td>
        <a className="text-center"
        onClick ={() => props.deleteCourse(props.course.id)}>
          <i className="fa fa-trash delete-icon" />
        </a>
      </td>
    </tr>
  );
};
