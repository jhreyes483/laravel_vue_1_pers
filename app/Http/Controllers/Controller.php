<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Traits\ResponseApi;

class Controller extends BaseController
{
public $responseApi;
    public function __construct()
    {
        $this->responseApi =  new ResponseApi();
    }

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function responseApi($statusTransaction, $message = [], $data = []): array
    {

        if (strtolower($message['type']) == 'success') {
            $message = $message;
            $message['code'] = 200;
        } else if (strtolower($message['type']) == 'error') {
            $message = $message;
            $message['code'] = 500;
        } else if (strtolower($message['type']) == 'warning') {
            $message = $message;
            $message['code'] = 300;
        } else {
            return abort(500);
        }


        return [
            'transaction' => [
                'status' => $statusTransaction
            ],
            'data' => $data,
            'message' => $message
        ];
    }

    public function getPermissionsByEntity($entity){
        $permissionNames = $entity->getPermissionNames();
        $permissionNames = array_values((array)  $permissionNames)[0];
        return  $permissionNames;
    }

    public function getRolesByEntity($entity){
        $permissionNames = $entity->getRoleNames();
        $permissionNames = array_values((array)  $permissionNames)[0];
        return  $permissionNames;
    }

}


