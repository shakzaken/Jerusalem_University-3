<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Http\Requests;
use App\User;
use App\UserImage;
use App\Course;
use App\Degree;
use App\StudentCourse;
use App\Http\Resources\User as UserResource;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      try{
        $users = User::all();
        foreach($users as $user){
          $user->image;
        }
        return UserResource::collection($users);
      }
      catch(Exception $err){
        return $err->message();
      }
        
    }

    public function registerToDegree(Request $request){
      try{
        $user = User::find($request->userId);
        if($user->role !=='student'){
          return response([
            'general' => 'User is not a student'
          ],400);
        }
        if($user->is_registered){
          return response([
            'general' => 'User is already registered'
          ],400);
        }
        $user->degree_id = $request->degreeId;
        $user->is_registered = true;
        $user->save();
        $courses = 
          DB::table('degrees_courses')
            ->where('degrees_courses.degree_id','=',$request->degreeId)
            ->join('courses','degrees_courses.course_id','=','courses.id')
            ->get();
            
        foreach($courses as $course){
          $studentCourse = new StudentCourse;
          $studentCourse->student_id = $user->id;
          $studentCourse->course_id = $course->id;
          $studentCourse->save();
        }

        return response($user);

      }catch(QueryException $err){
        return response([
          'general' => 'error registring user',
          'message' => $err->getMessage()
        ],500);
      }
      
    }

    public function getUserWithDegree($userId){
      try{
        $user = User::find($userId);
        $user->image;
        $degree = Degree::find($user->degree_id);
        $courses = 
          DB::table('students_courses')
          ->where('student_id','=',$user->id)
          ->join('courses','students_courses.course_id','=','courses.id')
          ->join('courses_images','students_courses.course_id','=','courses_images.id')
          ->get();
      
        return response([
          'user' => $user,
          'degree' => $degree,
          'courses' => $courses
        ]);
      }
      catch(Exception $err){
        return response([
          'general' => 'error getting user and courses'
        ],500);
      }
      
                    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
  
      try{
        $user = new User;
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email = $request->email;
        $user->password = password_hash($request->password,PASSWORD_DEFAULT);
        $user->role = $request->role;

        $userImage = new UserImage;
        $userImage->body = $request->image;

        $user->save();
        $userImage->id = $user->id;
        $userImage->save();
        return response($user);

      }catch(QueryException $err){
        if(isset($user->id)){
          $user->delete();
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
    public function get($id)
    {
      try{
        $user = User::find($id);
        if(!$user) {
          return response('User not found',400);
        }
        return response($user);

      }catch(QueryException $err){
        return response($err->getMessage(),500);
      }
        
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
        $user = User::find($id);
        $userImage = UserImage::find($id);
        $user->delete();
        $userImage->delete();
        return response($user);
    }


    public function instructors()
    {
      $instructors = 
      DB::select(
        "SELECT *
         FROM users 
         WHERE role = 'instructor' ");
        
      return response($instructors);

    }
}
