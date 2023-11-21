<?php

namespace App\Http\Traits;
/*
use App\City;
use App\Country;
use App\SpFail;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

*/
use Illuminate\Support\Facades\DB;

trait Sp
{

    public function executeSP(String $sp,Array $params = [], String $first = null): Array{
        $resp = [];
        $status = false;
        $this->sp_error = false;
        $this->sp_msg_error =  "";
        try {
            // $data = DB::connection('mysql')->select($sp, $params);
            // $db= DB::connection('mysql')->getPdo();
            $db = DB::getPdo();

            $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); // Reporte de errores: Lanza excepciones
            $db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, true); // Emula las sentencias preparadas en caso de que no se puedan ejecutar de forma nativa

            $queryResult = $db->prepare($sp);
            $queryResult->execute($params);
            $data = $queryResult->fetchAll(\PDO::FETCH_OBJ);

            $status = true;
            $queryResult->closeCursor();
        } catch (\Throwable $th) {
            $data = $th->getMessage();
            // if (isset($this->sp_error)) {
            //     $this->sp_error = true;
            //     $this->sp_msg_error = $th->getMessage();
            // }
            //aqui se va guardar un log de los sp que esten dando error
        }
        if(!$status){
            $this->sp_error = true;
            $this->sp_msg_error =  $data;

            try {
                $this->logSpFails($sp, $th->getMessage(), $params);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
        if ($status && $first === '1') { // consulta que retorna un solo registro
            return (isset($data[0])) ? $data[0] : $data;
        } else {
            return [
                'status' => $status,
                'data' => $data
            ];
        }
    }

    public function executeReadSp(String $sp, Array $params = []):Array{
        $resp = [];
        $status = false;
        $this->sp_error = false;
        $this->sp_msg_error =  "";
        try {
            $data = DB::select($sp, $params);
            $status = true;
        } catch (\Throwable $th) {
            $data = $th->getMessage();
            try {
                $this->logSpFails($sp, $th->getMessage(), $params);
            } catch (\Throwable $th) {
                //throw $th;
            }
            // if (isset($this->sp_error)) {
            //     $this->sp_error = true;
            //     $this->sp_msg_error = $th->getMessage();
            // }
            //aqui se va guardar un log de los sp que esten dando error
        }

        if(!$status){
            $this->sp_error = true;
            $this->sp_msg_error =  $data;
        }

        return [
            'status' => $status,
            'data' => $data
        ];
    }

    public function getNow($city_id = null){
        $time_actual = Carbon::now();
        // try {
        //     if(isset($city_id)){
        //         $city = City::find($city_id,['id','department_id']);
        //         if(isset($city) && isset($city->department)){
        //             $time_actual = $time_actual->addMinutes($city->department->country->time_diff);
        //         }
        //     }else{
        //         $user = $user= User::find(Auth::id());
        //         $country = Country::find($user->country_id,['time_diff']);
        //         $time_actual = $time_actual->addMinutes($country->time_diff);
        //     }
        // } catch (\Throwable $th) {
        //     return $time_actual;
        // }

        return $time_actual;
    }

    public function array_to_string(Array $array, $is_string = false){
        $string = "";
        foreach ($array as $key => $value) {
            if($key != 0){
                $string .=",";
            }

            if($is_string){
                $string .=  "'".$value."'";
            }else{
                $string .=  $value;
            }
        }
        return $string;
    }

    public function execSP($spName, $params, $read = true){
        DB::statement('SET sql_mode=(SELECT REPLACE(@@sql_mode,"ONLY_FULL_GROUP_BY",""))');
        $command = "CALL " . $spName ."(";

        $counter = 1;
        foreach ($params as $key => $value) {
            $command .= ":" . $key;

            if($counter < count($params) ){
                $command .= ",";
            }
            $counter = $counter + 1;
        }
        $command .= ")";

        if(isset($read) && $read){
            return $this->executeReadSp($command, $params);
        }

        return $this->executeSp($command, $params);
    }

    public function logSpFails(String $spName, String $error, Array $params){
        $spFail =  new SpFail();
        $spFail->user_id = Auth::id();
        $spFail->sp_name = $spName;
        $spFail->error = $error;
        $spFail->params = json_encode($params);
        $spFail->project_id=2; //Backoffice
        $spFail->save();
    }

}

