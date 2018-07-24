<?php

namespace App\Http\Middleware;

use Closure;
use \Firebase\JWT\JWT;
use Illuminate\Database\QueryException;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

      try{
        $key = env('PRIVATE_KEY','');
        $token = $request->header('Authorization');
        if(strlen($token) < 10){
          return response([
            'general' => 'User is not an Admin'
          ],401);
        }
        $decoded = JWT::decode($token, $key, array('HS256'));
        if(!$decoded){
          return response($err->getMessage(),401);
        }
        if($decoded->role ==='admin'){
            return $next($request);
        }else{
          return response([
            'general' => 'User is not an Admin'
          ],401);  
        }
      }catch(Exception $err){
        return response($err->getMessage(),401);
      }
      return response('User is not authenticated',401);
  }      
    
}
