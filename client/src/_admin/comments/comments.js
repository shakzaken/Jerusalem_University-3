import React, { Component } from "react";

export default class comments extends Component {
  render() {
    return (
      <div>
        <h2 className="admin-courses-header">Comments Table</h2>
        <table className="admin-comments-table">
          <thead>
            <tr>
              <th className="admin-courses-tiny-col" />
              <th className="admin-courses-medium-col">Details</th>
              <th className="admin-courses-big-col">Comment</th>
              <th className="admin-courses-tiny-col" />
            </tr>
          </thead>
          <tbody>
            {/*php foreach($data['comments'] as $comment) : ?> */}
            <tr className="comments-tr">
              <td />
              <td>
                <strong>id: </strong> comment_id; <br />
                <strong>Name: </strong>Name<br />
                <strong>Course: </strong>course_name;
              </td>
              <td>comment->body</td>
              <td />
            </tr>
            {/*php endforeach ; ?> */}
          </tbody>
        </table>
      </div>
    );
  }
}
