<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use App\Comment;
use App\Course;
use App\User;


class CommentsController extends Controller
{
  public function addComment(Request $request){
    try{
      $course = Course::find($request->courseId);
      if(!$course) return response(['general' => 'Course is not found'],400);
      $user = User::find($request->userId);
      if(!$user) return response(['general' => 'User is not found'],400);

      $comment = new Comment;
      $comment->user_id = $user->id;
      $comment->course_id = $course->id;
      $comment->comment_body = $request->body;
      $comment->save();
      return response($comment);
    }catch(QueryException $err){
      return response($err->getMessage(),500);
    }
    
  }

  public function deleteComment($id){
    try{
      $comment = Comment::find($id);
      $comment->delete();
      return response($comment);
    }catch(QueryException $err){
      return response($err->getMessage(),500);
    }
  }

  public function getAllComments(){
    try{
      $comments = 
        DB::table('comments')
        ->join('users','comments.user_id','=','users.id')
        ->join('courses','comments.course_id','=','courses.id')
        ->get();

      return response($comments);

    }catch(QueryException $err){
      return response($err->getMessage(),500);
    }
  }
}
