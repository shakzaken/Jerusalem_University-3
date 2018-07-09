<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Firebase\JWT\JWT;
use \App\User;
use \Config\keys;

class AuthController extends Controller
{
    public function login(Request $request){
    try{
      $key = env('PRIVATE_KEY','');
      $users = User::where('email',$request->email)->get();
      if(count($users) == 0){
        return response([
          'errors' => ['email' => 'Email or Password are not valid']
        ],400);
      }
      $user = $users[0];
      if(!password_verify($request->password,$user->password)){
        return response([
          'errors' => ['email' => 'Email or Password are not valid']
        ],400);
      }

      $jwt = JWT::encode($user, $key);
      return response([
        'token' => $jwt,
        'user' => $user
      ]);
    }catch(Exception $err){
      return $err->getMessage();
    }
      
      

    // DECODING.
    /* 
    $decoded = JWT::decode($jwt, $key, array('HS256'));

   
    print_r($decoded);
    $decoded_array = (array) $decoded;
    */
    }


    public function checkToken(Request $request){
      $key = "example_key";
      $jwt = $request->header('Authorization');
      $decoded = JWT::decode($jwt, $key, array('HS256'));
      $decoded_array = (array) $decoded;
      return response($decoded_array);
    }
}
