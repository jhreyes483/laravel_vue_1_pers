<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\RoleAssignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\Models\Role as ModelRole;

class AuthController extends Controller
{
    public function register(Request $request){


        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save(); 
        $token = $user->createToken('auth_token')->plainTextToken;
        // 1|wllFhjaNfC58YMuDE2eQyFcKGtG31gpDWJ3SKvlB
        return ['user'=>$user,'token'=>$token ];
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], /*401 */);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        /********** Suma los permisos del usario con los del rol **************** */
        $perms = [];
        $permiccions = $this->getPermissionsByEntity($user);
        $perms       = $permiccions;
        $roles       = $this->getRolesByEntity($user);
        if($roles && count($roles)){
            foreach ($roles as  $key => $name) {
                $permissionsRole = [];
                $role =  ModelRole::where('name', $name)->first();
                $permissionsRole  = $this->getPermissionsByEntity($role);
                $perms = array_merge($perms, $permissionsRole);
            }
            $perms = array_unique($perms);
        }
        /***************************************** */
    

        $data = response()->json([
            'status' => 'success',
            'authorisation' => [
                'token'     => $token,
                'type'      => 'bearer'
            ],
            'user' =>[
                'name'                     =>$user->name,
                'email'                    => $user->email,
                'permissions_user'         =>   $permiccions??[],
                'permissions_user_and_rol' => $permissionsRole,
                'role'                     => $roles??[]
            ]
        ]);
        /*
        $credentials = $request->only('email', 'password');
        if(!Auth::attempt($credentials)){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        $data = response()->json([
            'status' => 'success',
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
        */
        return $data;
/*
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AppName')->accessToken;

            return response()->json(['token' => $token], 200);
        }
        */

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
