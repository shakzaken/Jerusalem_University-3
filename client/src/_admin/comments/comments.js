import React, { Component } from "react";
import {connect} from 'react-redux';
import {getAllComments, adminDeleteComment} from '../../__actions/comments_actions';


class Comments extends Component {

  componentDidMount(){
    this.props.getAllComments();
  }

  deleteComment(id){
    if(!this.props.isAdmin){
      const errMsg = document.querySelector('.admin-table-error-message');
      errMsg.style.display = "inline-block";
      setTimeout(()=>{
        errMsg.style.display = "none";
      },3000);
      window.location.assign("#admin-main-block");
      return;
    }
    if(!window.confirm('Are you sure you want to delete this comment?')) { return; }
    this.props.adminDeleteComment(id,() => this.props.getAllComments());
  }

  render() {
    const comments = this.props.comments.map(comment => 
      <div className="admin-comments-row" key={comment.comment_id}>
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
        <div className="admin-table-error-message">You are not allowed to perform this action</div>
          {comments}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    comments: state.comments.commentsList,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps,{getAllComments,adminDeleteComment})(Comments);