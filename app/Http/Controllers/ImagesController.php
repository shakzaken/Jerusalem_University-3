<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CourseImage;
use App\UserImage;
use App\DegreeImage;

class ImagesController extends Controller
{
    public function course($id)
    {
      $data = CourseImage::find($id);
      return response($data->image)->header('Content-Type','image/jpeg');
    }
    public function user($id)
    {
      $data = UserImage::find($id);
      return response($data->image)->header('Content-Type','image/jpeg');
    }

    public function degreeOne($id)
    {
      $data = DegreeImage::find($id);
      return response($data->image1)->header('Content-Type','image/jpeg');
    }

    public function degreeTwo($id)
    {
      $data = DegreeImage::find($id);
      return response($data->image2)->header('Content-Type','image/jpeg');
    }
    
    public function degreeThree($id)
    {
      $data = DegreeImage::find($id);
      return response($data->image3)->header('Content-Type','image/jpeg');
    }

    
   
}
