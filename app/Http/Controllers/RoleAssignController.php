<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Traits\Sp;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Models\Role;
use App\Http\Helpers\Handler as HandlerPermisions;
use Spatie\Permission\Models\Permission as ModelPermission;

class RoleAssignController extends Controller
{
    use Sp;
    //


    public function getUsers(Request $request){
        // traiga los usuario por paginado
        $sp     = 'lsp_get_users';
        $params = [
            'p_offset' => HandlerPermisions::getOffsetTable($request)   ,
            'p_limit'  => $request->limit??2,
        ];     
        $resp  = $this->execSP($sp, $params);
        $count = ($resp['data'][0]->count??0);
        return HandlerPermisions::responseFormatTable($resp, $count , [] , $sp.json_encode($params), $this );
    }


    public function getRoles(Request $request){
        $roles = Role::all();
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Roles'], ['roles']);
      
    }


    public function getPermissions(){
        // trae los permisos
        $permissions  = ModelPermission::all();
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Permisos'], []);
    }

    public function getUserById(Request $request){
        $user  = User::find($request->id);
        $roles = Role::all();

        if($user && is_object($user)){

            $userRoles = $user->roles()->pluck('id')->toArray();
            foreach( $roles as $role ){
                $usRole[$role->id]  = (in_array($role->id, $userRoles));
            }

            $response = [
                'user'          =>$user,
                'roles'         =>$roles,
                'usuarioRoles'  =>$usRole
            ];

            return $this->responseApi->response(true, ['type' => 'success', 'content' => 'User'], $response);
        }else{
            return $this->responseApi->response(true, ['type' => 'error', 'content' => 'No existe el usuario'], []);
        }
    }

    public function updateUserRoles(Request $request ){


        $user = User::find($request->user_id);

        $t = $user->roles()->sync($request->rolesSelected);

        $userRoles = $user->roles()->pluck('id')->toArray();



        $roles = $user->roles()->select('id', 'name')->get();
       foreach ($roles as $role) {
            $response['roles_user'] = ['id' => $role->id, 'name' => $role->name];
       }
       $response['roles_selected'] = $request->rolesSelected;

        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Actulizo roles de usuario'], ['roles_user' => $response]);
       
    }
}
