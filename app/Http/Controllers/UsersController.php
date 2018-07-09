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
    public function show($id)
    {
        //
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
