import React, { Component } from "react";
import {connect} from 'react-redux';
import {getAllComments,deleteComment} from '../../__actions/comments_actions';


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
      <div className="admin-comments-row">
        <div className="admin-comments-row-details">
          <strong>id: </strong> {comment.comment_id} <br />
          <strong>Name: </strong>{comment.first_name} {comment.last_name}<br />
          <strong>Course: </strong>{comment.name}
        </div>
        <div className="admin-comments-row-body">
          {comment.comment_body}
        </div>
        <div className="admin-comments-row-delete"
          onClick={() => this.deleteComment(comment.comment_id)}>
        <span>Delete</span>
        </div>  
      </div>
    )
    
    return (
      <div className="admin-table">
        <h2 className="admin-form-header admin-form-header-fix">Comments Table</h2>
          {comments}
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