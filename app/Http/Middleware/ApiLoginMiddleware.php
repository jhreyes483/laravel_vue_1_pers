<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class ApiLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guard('api')->check()) {
            return $next($request);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized',
        ], 401);
    }
}
