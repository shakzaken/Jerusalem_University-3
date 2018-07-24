import React from "react";
import {Link} from 'react-router-dom';

export default props => {
  return (
    <tr>
      <td>
        <img
          className="admin-degrees-table-image"
          src={props.degree.images.body1}
          alt="degree"
        />
      </td>
      <td>
        <Link
          className="admin-degrees-table-link"
          to={`/admin/degrees/${props.degree.id}`}>
          {props.degree.name}
        </Link>
      </td>
      <td>{props.degree.id}</td>
      <td>
        <a 
          className="text-center"
          onClick={() => props.deleteDegree(props.degree.id)}>
          <i className="fa fa-trash delete-icon" />
        </a>
      </td>
    </tr>
  );
};
