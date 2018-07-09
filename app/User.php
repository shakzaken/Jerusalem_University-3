<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  public $timestamps = false;

  public function image()
  {
      return $this->hasOne('App\UserImage','id');
  }
}
