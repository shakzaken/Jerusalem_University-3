<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Course;
use App\Topic;
use App\CourseImage;
use App\DegreeImage;
use App\UserImage;
use App\Comment;
use App\Http\Resources\Course as CourseResource;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courses = Course::all();
        foreach($courses as $course) 
          $course->image;
        return CourseResource::collection($courses);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      try{
        $course = new Course;
        $course->name = $request->name;
        $course->description = $request->description;
        $course->points = $request->points;
        $course->instructor = $request->instructor;
        $course->instructorId = $request->instructorId;
        $course->field = $request->field;

        $course->save();
        $courseImage = new CourseImage;
        $courseImage->id = $course->id;
        $courseImage->body = $request->image;
        $courseImage->save();
        return response($course);

      }catch(QueryException $err){
        if($course->id){
          $course->delete();
        }
        return response($err->getMessage(),500);
      }
 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  

    public function show($id)
    {
        $course = Course::find($id);
        $course->image;
        $topics = 
          DB::table('topics')
            ->where('topics.course_id','=',$id)
            ->get();
        $comments = 
          DB::table('comments')
            ->where('comments.course_id','=',$id)
            ->join('users','comments.user_id','=','users.id')
            ->join('users_images','comments.user_id','=','users_images.id')
            ->get();
        
        return response([
          'course' => $course,
          'topics' => $topics,
          'comments' => $comments
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try{
        $course = Course::find($id);
        $courseImage = CourseImage::find($id);
        $course->delete();
        $courseImage->delete();
        return response($course);
      }catch(QueryException $err){
        return response($err->getMessage(),500);
      }
        
    }

    public function getTopics($id){
      try{
        $course = Course::find($id);
        $topics = Topic::where('course_id',$id)->get();
        $data = [
          'course' => $course,
          'topics' => $topics
        ];
        return response($data);
      }catch(QueryException $err){
        return response($err->getMessage(),500);
      }
      
    }


    public function addTopic(Request $request){
      try{
        $topic = new Topic;
        $topic->name = $request->name;
        $topic->course_id = $request->courseId;
        $topic->save();
        return response($topic);
      }catch(QueryException $err){
        return response($err->getMessage(),500);
      }
    }

    public function deleteTopic($id){
      try{
        $topic = Topic::find($id);
        $topic->delete();
        return response($topic);
      }catch(QueryException $err){
        return response($err->getMessage(),500);
      }
    }

    

    
}
