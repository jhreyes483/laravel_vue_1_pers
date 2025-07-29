<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(){
        $users = User::select('id','name')->get();
        return['status'=>true, 'users' => $users];
    }

}
