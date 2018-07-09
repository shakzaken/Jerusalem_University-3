<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserImage extends Model
{
  public $timestamps = false;
  protected $table = 'users_images';
}
