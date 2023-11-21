<?php

namespace App\Http\Helpers;


final class Handler
{
    public static function view($dato, $sale = 0, $bg = 0, $tit = '', $float = false, $email = ''){
        switch ($bg) {
            case 1:
                $bgColor = 'b0ffff';
                break;
            case 2:
                $bgColor = 'd0ffb9';
                break;
            default:
                $bgColor = 'ffcfcd';
                break;
        }
        echo '<div style="background-color:#' . $bgColor . '; border:1px solid maroon;  margin:auto 5px; text-align:left;' . ($float ? ' float:left;' : '') . ' padding: 0 7px 7px 7px; border-radius:7px; margin-top:10px; ">';
        echo '<h2 style="padding: 5px 5px 5px 10px; margin: 0 -7px; color: #FFF; background-color: #FF6F00; border-radius: 6px 6px 0 0; display:flex">&nbsp;Debugging for:&nbsp;&nbsp;<span style="color:black">' . $tit . '</span></h2>';
        if (is_array($dato) || is_object($dato)) {
            echo '<pre>';
            print_r($dato);
            echo '</pre>';
        } else {
            if (isset($dato)) {
                echo '<b>&raquo;&raquo;&raquo; DEBUG &laquo;&laquo;&laquo;</b><br><br>' . nl2br($dato);
            } else {
                echo 'LA VARIABLE NO EXISTE';
            }
        }
        echo '</div>';
        if ($sale == 1) die();
        if ($email != '') mail('', 'SQL', $dato, '');
    }

    static function isVarString($param): ?string
    {
        if (isset($param)) {

            if (is_string($param) || is_integer($param)) {
                return (string) $param;
            } elseif (is_array($param)) {
                return implode(',', $param);
            } elseif (is_object($param)) {
                return serialize($param);
            }

        } else {
            return 'no existe';
        }
        return 'no result';
    }

    static function sendLog($email, $text){
        Mail::to($email)->send(new Log( 'Proyecto backoffice: '.$text ));
    }

    static function sendErrorTh(\Throwable $th, array $mails, $dump = false,  bool $responseError = true, bool $sendMail = true): ?array
    {
        $msg = 'error en jobs-wms ' . $th->getFile() . ' ' . $th->getMessage() . ' ' . $th->getLine();
        if ($dump) dump($msg);
        Handler::logDb($th->getMessage().' line '.$th->getLine(), 'proyecto jobs', $th->getFile(), $th->getMessage().' line '.$th->getLine(), null, 'WMS th', null, 'error');

        if ($sendMail)  Handler::sendLog($mails, $msg); // eniva correo
        Handler::isLocalStop($msg, []); // para la ejecucion con un dd si el entorno es local
        if ($responseError)  return ResponseApi::error($msg);
        else return [];  // responde error estructura api
    }

    static function sendErrorThWms( $emails, \Throwable $th): ?array
    {
        try {
            $msg = 'error en jobs-wms ' . $th->getFile() . ' ' . $th->getMessage() . ' ' . $th->getLine();
            Handler::logDb($th->getMessage().' line '.$th->getLine(), 'proyecto backoffice', $th->getFile(), $th->getMessage().' line '.$th->getLine(), null, 'WMS th', null, 'error');
            Handler::sendLog( $emails, $msg); // eniva correo
        }
        catch (\Throwable $th) {

        }
        return [];
    }




    static function sendLogUser($email, $matter,$head, $text){
        Mail::to($email)->send(new LogInventory( $matter,$head,$text ));
    }

    /**
     * @param $response
     * @param $emails
     * @param $from
     * @return array|mixed
     * @throws \Throwable
     */
    static function validateResultSql($response, $emails, $from, $format = 0)
    {
        try {
            if(isset( $response['data'][0]->Level ) && $response['data'][0]->Level == 'Error'){
             //   Mail::to($emails)->send(new Log( 'Proyecto backoffice Error en: '.$from.'     '.json_encode($response)    ));
            }

            if ($response['status'] && isset($response['data']) && isset($response['data'][0])) {
                if($format){
                    $response = ($response['data'][0] ?? $response['data'] );
                }else{
                    $response = $response['data'];
                }

                return $response;
            } else {
              //  Mail::to($emails)->send(new Log( 'Proyecto backoffice Error en: '.$from.' '.json_encode($response)  ));
            }

        } catch (\Throwable $th) {

           // Mail::to($emails)->send(new Log(  'Proyecto backoffice Error en: '.$from.' '.$th->getMessage()));
            throw $th;

        }
        return is_array($response) ? $response : [];
    }





    static function validateResultSqlWms($response, $emails, $from): ?array
    {
        try {
            if (isset($response['data'][0]->Level) && $response['data'][0]->Level == 'Error') {
                Handler::logDb($response,$response, $from, $response, null, 'WMS sql', null, 'error');
                Handler::mailTo($emails, $from, $response);
                //   Handler::isLocalStop($from, $response);
            }

            if ($response['status'] && isset($response['data']) && isset($response['data'][0])) {
                return $response['data'];
            } else {
                Handler::logDb($response,$response, $from, $response, null, 'WMS sql', null, 'error');
                Handler::mailTo($emails, $from, $response);
                //   Handler::isLocalStop($from, $response);
            }
        } catch (\Throwable $th) {
            Handler::mailTo($emails, ($from .= $th->getMessage() . ' ' . $th->getFile() . ' ' . $th->getLine()), $response);
            //    Handler::isLocalStop($from, $response);
        }
        return is_array($response) ? $response : [];
    }

    static function mailTo($emails, string $from = '', array $response = [], $stop = false)
    {
        try {
            $t = Mail::to($emails)->send(new Log('proyecto backoffice  Error en: ' . $from . '     ' . json_encode($response)));
            if ($stop) dump('proyecto job-wms  Error en: ' . $from . '     ' . json_encode($response));
        } catch (\Throwable $th) {
            $msg = $th->getMessage().' line '.$th->getLine();
            Handler::logDb($msg, 'proyecto backoffice', $th->getFile(), $th->getMessage().' line '.$th->getLine(), null, 'WMS th', 'error al enviar correo', 'error');
        }
    }

    /**
     * @param $response
     * @param array $emails
     * @param string $from
     * @param int $countMaxZero
     * @return array
     */
    static function validateResultSqlResponse($response, $emails = [], $from = '', $countMaxZero = 0): array
    {
        try {
            if(isset( $response['data'][0]->Level ) && $response['data'][0]->Level == 'Error'){
                return  [
                    'error' => true,
                    'msg'   =>json_encode($response).' -> Error level, interno sp '.$from,
                ];
            }

            if(isset($response['data']) && is_array($response['data']) && $countMaxZero &&  count($response['data']) == 0){
                return  [
                    'error' =>true,
                    'msg'   =>json_encode($response).' -> El conteo de rows sp '.$from.' es 0',
                ];
            }

            if ($response['status'] && isset($response['data']) ) {
                return  [
                    'error' =>false,
                    'msg'   =>'sp ok',
                ];

            } else {
                return  [
                    'error' =>true,
                    'msg'   =>json_encode($response).' -> Error status false, sp '.$from,
                ];
            }

        }catch (\Throwable $th) {
            return  [
                'error' =>true,
                'msg'   =>'Error th '. $th->getMessage().', '.$th->getLine().', '.$th->getFile().'sp '.$from
            ];
        }
    }

    static function validateResultSqlVcountCero($response, $emails, $from): ?array
    {
        try {
            if(isset( $response['data'][0]->Level ) && $response['data'][0]->Level == 'Error'){
                Mail::to($emails)->send(new Log( 'Proyecto backoffice Error en: '.$from.'     '.json_encode($response)    ));
            }

            if ($response['status'] && isset($response['data']) ) {
                return $response['data'];
            } else {
                Mail::to($emails)->send(new Log( 'Proyecto backoffice Error en: '.$from.' '.json_encode($response)  ));
            }

        } catch (\Throwable $th) {

            Mail::to($emails)->send(new Log(  'Proyecto backoffice Error en: '.$from.' '.$th->getMessage()));
            // throw $th;

        }
        return is_array($response) ? $response : [];
    }

    static function validateResultSqlVcountCeroWms($response, $emails, $from): ?array
    {
        try {
            $stop = false;
            if (isset($response['data'][0]->Level) && $response['data'][0]->Level == 'Error') {
                Handler::logDb($response,$response, $from, $response, null, 'WMS sql', null, 'error');
                Handler::mailTo($emails, $from, $response, $stop);
                // Handler::isLocalStop($from, $response);
            }

            if ($response['status'] && isset($response['data'])) {
                return $response['data'];
            } else {
                Handler::logDb($response,$response, $from, $response, null, 'WMS sql', null, 'error');
                Handler::mailTo($emails, $from, $response, $stop);
                // Handler::isLocalStop($from, $response);
            }
        } catch (\Throwable $th) {
            Handler::mailTo($emails, ($from .= $th->getMessage() . ' ' . $th->getFile() . ' ' . $th->getLine()), $response, $stop);
        }
        return is_array($response) ? $response : [];
    }

    static function logDb($dataSend, $response, $from, $message, $url, $responsible = 1, $dataRecibe = null, $type='successful',$model='GENERAL', $time_execution=0, $job_execution_id=null){
        try {
            $log_wms = LogWmsIntegration::create([
                'file' => $from,
                'message' =>  (is_array( $message) ? json_encode($message) : $message),
                'data_send' =>(is_array($dataSend) ? json_encode($dataSend) : $message),
                'response' => 'proyecto backoffice',
                'type' => $type,
                'responsible' => $responsible,
                'data_recibe' => (is_array($dataRecibe) ?  json_encode($dataRecibe) : $dataRecibe),
                'url' =>   'error interno',
                'model' => $model,
                'execution_time' => $time_execution,
                'job_execution_id' => $job_execution_id
            ]);

            return !$log_wms ? false : true;

        } catch (\Throwable $th) {
        }
    }

}
