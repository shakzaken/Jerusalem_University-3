<?php

use Illuminate\Http\Request;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*
*   Users 
*/
Route::get('users/instructors','UsersController@instructors');
Route::get('users','UsersController@index');
Route::get('users/{id}','UsersController@get');
Route::post('users','UsersController@store')
  ->middleware('auth.admin');
Route::put('users/{id}','UsersController@update')
  ->middleware('auth.admin');
Route::delete('users/{id}','UsersController@destroy')
  ->middleware('auth.admin');

Route::get('users/students/{id}','UsersController@getUserWithDegree')
  ->middleware('auth.user');  
Route::post('users/students/register','UsersController@registerToDegree')
  ->middleware('auth.user');


/*
*   Courses 
*/


Route::get('courses/topics/{id}','CoursesController@getTopics');
Route::get('courses/{id}','CoursesController@show');
Route::get('courses','CoursesController@index');

Route::post('courses/topics','CoursesController@addTopic')
  ->middleware('auth.admin'); 
Route::post('courses','CoursesController@store')
  ->middleware('auth.admin');

Route::put('courses/{id}','CoursesController@update')
  ->middleware('auth.admin');
Route::delete('courses/{id}','CoursesController@destroy')
  ->middleware('auth.admin');
Route::delete('courses/topics/{id}','CoursesController@deleteTopic')
  ->middleware('auth.admin'); 



// Comments
Route::get('comments','CommentsController@getAllComments');
Route::post('comments','CommentsController@addComment')
  ->middleware('auth.user');
Route::delete('comments/{id}','CommentsController@deleteComment')
  ->middleware('auth.user');
Route::delete('comments/admin/{id}','CommentsController@deleteComment')
  ->middleware('auth.admin');


/*
*   Degrees 
*/

Route::get('degrees','DegreesController@index');
Route::get('degrees/{id}','DegreesController@show');
Route::post('degrees/courses','DegreesController@addCourseToDegree')
  ->middleware('auth.admin');
Route::post('degrees','DegreesController@store')
  ->middleware('auth.admin');
Route::put('degrees/{id}','DegreesController@update')
  ->middleware('auth.admin');
Route::delete('degrees/{id}','DegreesController@destroy')
  ->middleware('auth.admin');
Route::delete('degrees/courses/{id}','DegreesController@deleteCourse')
  ->middleware('auth.admin');



/*
*   Auth
*/ 
Route::post('auth/register','UsersController@store');
Route::post('auth/login','AuthController@login');
