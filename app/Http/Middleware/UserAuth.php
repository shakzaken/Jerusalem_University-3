<?php

namespace App\Http\Middleware;

use Closure;
use \Firebase\JWT\JWT;
use Illuminate\Database\QueryException;

class UserAuth
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
              return response('User is not authenticated',401);
            }
            $decoded = JWT::decode($token, $key, array('HS256'));
            if(!$decoded){
              return response($err->getMessage(),401);
            }
            if($decoded->role ==='student' || $decoded->role ==='admin' ||
              $decoded->role ==='instructor'){
                return $next($request);
            }
          }catch(Exception $err){
            return response($err->getMessage(),401);
          }
          return response('User is not authenticated',401);
      }
}
