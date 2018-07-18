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
Route::post('users','UsersController@store');
Route::put('users/{id}','UsersController@update');
Route::delete('users/{id}','UsersController@destroy');

Route::get('users/students/{id}','UsersController@getUserWithDegree');
Route::post('users/students/register','UsersController@registerToDegree');


/*
*   Courses 
*/


Route::get('courses/topics/{id}','CoursesController@getTopics');
Route::get('courses/{id}','CoursesController@show');
Route::get('courses','CoursesController@index');

Route::post('courses/topics','CoursesController@addTopic');
Route::post('courses','CoursesController@store');

Route::put('courses/{id}','CoursesController@update');
Route::delete('courses/{id}','CoursesController@destroy');
Route::delete('courses/topics/{id}','CoursesController@deleteTopic');



// Comments
Route::get('comments','CommentsController@getAllComments');
Route::post('comments','CommentsController@addComment');
Route::delete('comments/{id}','CommentsController@deleteComment');


/*
*   Degrees 
*/

Route::get('degrees','DegreesController@index');
Route::get('degrees/{id}','DegreesController@show');
Route::post('degrees/courses','DegreesController@addCourseToDegree');
Route::post('degrees','DegreesController@store');
Route::put('degrees/{id}','DegreesController@update');
Route::delete('degrees/{id}','DegreesController@destroy');
Route::delete('degrees/courses/{id}','DegreesController@deleteCourse');



/*
*   Images 
*/

Route::get('images/courses/{id}','ImagesController@course');
Route::get('images/users/{id}','ImagesController@user');

Route::get('images/degrees1/{id}','ImagesController@degreeOne');
Route::get('images/degrees2/{id}','ImagesController@degreeTwo');
Route::get('images/degrees3/{id}','ImagesController@degreeThree');



/*
*   Auth
*/ 

Route::post('auth/login','AuthController@login');
Route::post('auth/token','AuthController@checkToken');