<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  public $timestamps = false;
  public function user()
  {
    return $this->belongsTo('App\User');
  }
  public function image()
  {
    return $this->belongsTo('App\UserImage','user_id');
  }
  
  
}
