<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Degree;
use App\Course;
use App\CourseImage;
use App\DegreeImage;
use App\DegreeCourses;
use App\Http\Resources\Degree as DegreeResource;
use App\Http\Resources\Course as CourseResource;

class DegreesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $degrees = Degree::all();
        foreach($degrees as $degree){
          $degree->images;
          $degree->images->body2 = $degree->images->body3 = '';
        }
        $data = ['data' => $degrees];
        return response($data);
    }

    public function courses($degreeId)
    {
      
      
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $tempDegree1 = Degree::where('name',$request->name)->get();
        if(count($tempDegree1) > 0 ){
          return response([
            'name' => 'Name is already exists'
          ],400);
        }
        $tempDegree2 = Degree::where('full_name',$request->fullName)->get();
        if(count($tempDegree2) > 0 ){
          return response([
            'fullName' => 'Full Name is already exists'
          ],400);
        }


        $degree = new Degree;
        $degree->name = $request->name;
        $degree->full_name = $request->fullName;
        $degree->points = $request->points;
        $degree->description = $request->description;
        $degree->save();

        $degreeImage = new DegreeImage;
        $degreeImage->body1 = $request->image1;
        $degreeImage->body2 = $request->image2;
        $degreeImage->body3 = $request->image3;
        $degreeImage->id = $degree->id;
        $degreeImage->save();
        return response($degree);

      }catch(QueryException $err){
        if(isset($degree->id)){
          $degree->delete();
        }
        return response($err->getMessage(), 500);
      }
    }


    public function addCourseToDegree(Request $request)
    {
      try{

        $tempData = 
          DegreeCourses::where('course_id',$request->courseId)
              ->where('degree_id',$request->degreeId)
              ->count();
        if($tempData > 0){
          return response([
            'course' => 'This course is already added to this degree'
          ],400);
        }
              
        $degree_courses = new DegreeCourses;
        $degree_courses->course_id = $request->courseId;
        $degree_courses->degree_id = $request->degreeId;
        $degree_courses->save();
        return response($degree_courses);

      }catch(QueryException $err){
        return response($err->getMessage(), 500);
      }
    }

    public function deleteCourse($id)
    {
      try{
        DB::table('degrees_courses')
          ->where('dc_id','=',$id)->delete();
          
        return response('deleted successfuly');
      }catch(QueryException $err){
        return response($err->getMessage(), 500);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($degreeId)
    {
      try{

        $courses = DB::table('degrees_courses')
          ->where('degree_id',$degreeId)
          ->join('courses','degrees_courses.course_id','=','courses.id')
          ->join('courses_images','degrees_courses.course_id','=','courses_images.id')
          ->get();

        $degree = Degree::find($degreeId);
        $degree->images;
        /*
        $courses = Degree::find($degreeId)->courses;
        foreach($courses as $course){
         $course->image;
        }
        */
        $data = [
          'degree' => $degree,
          'courses' => $courses
        ];
        
        return response( $data ); 
      }
      catch(Exception $err){
        return $err->getMessage();
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
        $degree = Degree::find($id);
        $degreeImage = DegreeImage::find($id);
        $degree->delete();
        $degreeImage->delete();
        return response($degree);
    }
}
