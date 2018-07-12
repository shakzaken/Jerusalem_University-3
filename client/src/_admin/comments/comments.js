import React, { Component } from "react";
import {connect} from 'react-redux';
import {getAllComments,deleteComment} from '../../__actions/comments_actions';
import './comments.css';

class Comments extends Component {

  componentDidMount(){
    this.props.getAllComments();
  }

  deleteComment(id){
    if(!window.confirm('Are you sure you want to delete this comment?')) { return; }
    this.props.deleteComment(id,() => this.props.getAllComments());
  }

  render() {
    const comments = this.props.comments.map(comment => 
      <tr className="admin-comments-row">
        <td />
        <td>
          <strong>id: </strong> {comment.comment_id} <br />
          <strong>Name: </strong>{comment.first_name} {comment.last_name}<br />
          <strong>Course: </strong>{comment.name}
        </td>
        <td class="admin-comments-body">{comment.comment_body}</td>
        <td onClick={() => this.deleteComment(comment.comment_id)}>Delete</td>
      </tr>
    )
    
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
            {comments}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    comments: state.comments.commentsList
  };
}

export default connect(mapStateToProps,{getAllComments,deleteComment})(Comments);