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
}


