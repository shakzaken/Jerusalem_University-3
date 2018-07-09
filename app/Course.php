<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
  public $timestamps = false;
  public function image()
  {
      return $this->hasOne('App\CourseImage','id');
  }
  public function comments()
  {
    return $this->hasMany('App\Comment');
  }

  public function topics()
  {
    return $this->hasMany('App\Topic');
  }
}
