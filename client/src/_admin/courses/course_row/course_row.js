import React from "react";
import {Link} from 'react-router-dom';

export default props => {
  
  return (
    <tr>
      <td>
        <img
          className="admin-courses-table-image"
          src={props.course.image.body}
          alt="course"
        />
      </td>
      <td>
        <Link 
          to={`/admin/courses/${props.course.id}`}
          className="admin-courses-table-link">
          {props.course.name}
        </Link>
      </td>
      <td>{props.course.instructor}</td>
      <td className="hide-on-phone">{props.course.field}</td>
      <td className="hide-on-phone">{props.course.points}</td>
      <td className="hide-on-phone">{props.course.id}</td>
      <td>
        <a className="text-center"
        onClick ={() => props.deleteCourse(props.course.id)}>
          <i className="fa fa-trash delete-icon" />
        </a>
      </td>
    </tr>
  );
};
