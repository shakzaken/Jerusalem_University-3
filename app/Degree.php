<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
  public $timestamps = false;
  public function courses()
  {
    return $this->belongsToMany('App\Course', 'degrees_courses', 'degree_id', 'course_id');
  }

  public function images()
  {
      return $this->hasOne('App\DegreeImage','id');
  }
}
