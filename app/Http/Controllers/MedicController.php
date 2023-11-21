<?php

namespace App\Http\Controllers;

use App\Http\Helpers\Handler;
use Illuminate\Http\Request;
use App\Http\Traits\Sp;
use Carbon\Carbon;

class MedicController extends Controller
{

    use sp;

    public function __construct()
    {
        parent::__construct();
    }


    public function __invoke(Request $request){
        try {
            $dateSearch= ( isset( $request->date) ? Carbon::parse($request->date)->toDateString() : Carbon::now('America/Bogota')->toDateTimeString() );
            $params   = ['p_user_id'=>1, 'p_data_serach' => $dateSearch];
            $all      = $this->execSP('lsp_get_earrings' ,$params);
            $dispo    = $this->execSP('lsp_get_available', []);


            $dateProcedureOne   = '2022-08-27 19:00:00';
            $dateProcedureTwo   = '2023-09-09 19:00:00';
            $dateProcedureThree = '2023-10-18 19:00:00';
            
            $diffOne   = strtotime(date ('Y-m-d H:i:s')) - strtotime($dateProcedureOne);
            $diffTwo   = strtotime(date ('Y-m-d H:i:s')) - strtotime($dateProcedureTwo);
            $diffThree = strtotime(date ('Y-m-d H:i:s')) - strtotime($dateProcedureThree);
            $timeOne   = $this->humanTime($diffOne,1,0,0,1 );
            $timeTwo   = $this->humanTime($diffTwo,1,0,0,1 );
            $timeThree = $this->humanTime($diffThree,1,0,0,1 );


            $dispo      = $dispo['data'];
            $dispo[]    =[
                'mounts' =>( $timeOne /30),
                'days'   => $timeOne ,
                'semanas'=>( $timeOne /7),
                'years'  =>( $timeOne /365),
                'title'  =>'Procedimiento 1'
            ];
            $dispo[]  =[
                'mounts' =>( $timeTwo /30),
                'days'   => $timeTwo ,
                'semanas'=>( $timeTwo /7),
                'years'  =>( $timeTwo /365),
                'title'  =>'Procedimiento 2'
            ];
            $dispo[] = [
                'mounts' =>( $timeThree /30),
                'days'   => $timeThree  ,
                'semanas'=>( $timeThree  /7),
                'years'  =>( $timeThree  /365),
                'title'  =>'co2'
            ];

            $response = $this->alreadyTookTheMedication($all['data']);
            $response['card'] = $dispo;
            return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'], $response);
        } catch (\Throwable $th) {
            $msg = $th->getMessage().' line->'.$th->getLine().' '.$th->getFile();
            dd($msg);
            // $this->ver($msg,1);
        }
    }


    public function search(Request $request){
        dd( date( 'Y-m-d', strtotime($request->date) ) );

    }


    public function  humanTime($input_seconds,int $rs = 1,int $normal = 0,int $mostrarD = 0, $day = 0): string
    {
        /* by: Javier Reyes Neira */
        //$rs = muestra segundos // normal=1 deja h m s  como abreviaturas // mostrarD=1 muestra días
        $days       = floor($input_seconds / 86400);
        $remainder  = floor($input_seconds % 86400);
        $hours      = floor($remainder / 3600);
        $remainder  = floor($remainder % 3600);
        $minutes    = floor($remainder / 60);
        $seconds    = floor($remainder % 60);

        $daysNumber =  $days;
        if ($mostrarD > 0) {
            $hours += $days * 24;

            $days = '';

        } else {
            $days = ($days > 0) ? $days . ($normal == 0 ? ' dias' : 'd') : '';
        }
        $hours   = ($hours > 0) ? $hours . ($normal == 0 ? ' horas' : 'h') : '';
        $minutes = ($minutes > 0) ? $minutes . ($normal == 0 ? ' min' : 'm') : '';
        $seconds = ($seconds > 0 && $rs == 1) ? $seconds . ($normal == 0 ? ' seg' : 's') : '';

        return ( $day ? $daysNumber:  "$days $hours $minutes $seconds");
    }

    public function getUsers(){

    }

    public function getProgressBar(){
        $params        =  ['p_user_id'=>1];
        $progressBar   = $this->execSP('lsp_get_progress__bar_lv1' ,$params);
        // validateResultSql($response, $emails, $from, $format = 0)
        $progressBar   = Handler::validateResultSql($progressBar, [], 'lsp_get_progress__bar_lv1' );
        if(true){
            return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'], $progressBar);
        }
        return $this->responseApi->response(true, ['type' => 'error', 'content' => 'No hay datos'], []);
    }



    public function alreadyTookTheMedication($allData): array
    {
        $medicinesAllowed = [];
        if(count($allData) > 0){
            foreach ($allData as $took) {

                if($took->ya_tome == 0){
                    $medicinesAllowed[] =[ 'id'=>$took->medicine_id, 'name'=> $took->medicine_name  ];
                }

                $currentDateTime = Carbon::now('America/Bogota');
                $vence = '2023-04-16';
                $cdt = [
                    'vence'=>$vence,
                    'today' => ($vence == $currentDateTime->toDateString() ),
                    'now'=>$currentDateTime->toDateString()
                ];

            }
        }
        return ['medicines'=>$medicinesAllowed,'logs'=>$allData,'cdt'=>$cdt];
    }


    public function saveLog(Request $request){
        $currentDateTime = Carbon::now('America/Bogota');
        if( isset( $request->date)  ){
         $date =   Carbon::parse($request->date)->toDateString().' '.$currentDateTime->toTimeString();
        }else{
            $date = $currentDateTime->toDateString();
        }
        $params =  ['p_medicine_id' =>  $request->medicine_id, 'p_user_id' => 1, 'p_date' => $date ] ;

        $save = $this->execSP( 'lsp_save_log', $params );
        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'], ['msg'=> $save['data'][0]]);


        /*
            $sql =  $this->model->m_consulta(6, $_POST['medicine']);
            $b   = $this->db->m_ejecuta($sql);
            if($b){
                $sql =  $this->model->m_consulta(3, [$_POST['medicine'], $_POST['user']]);
                $b   = $this->db->m_ejecuta($sql);
            }
            if($b){
                echo '<script> window.location.href  = " '.BASE_URL.' ";</script>';
            }

        */
    }





}
