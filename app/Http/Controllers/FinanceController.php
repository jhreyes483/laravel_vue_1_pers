<?php

namespace App\Http\Controllers;

use App\Http\Traits\Sp;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    use sp;

    public function __construct()
    {
        parent::__construct();
    }

    public function getInvestments()
    {
        $r = $this->execSP('lsp_get_investments', []);
        foreach ($r['data'] as $i => $item) {
            $r['data'][$i]->valor = $this->formato_pesos_colombianos($item->valor);
            $r['data'][$i]->profit_obtained = $this->formato_pesos_colombianos($item->profit_obtained);
        }

        return $this->responseApi->response(true, ['type' => 'success', 'content' => 'Done'], $r['data']);
    }


    public function formato_pesos_colombianos($numero, $signoPeso = '$ ') {
        $decimas = strlen($numero);
        if($decimas <= 3){
            return $numero;
        }else{
            $result= '';
            $tmp        = str_split(strrev($numero),1);
            $iterMil    = 0;
            $iterMillon = 0;
            foreach ($tmp  as  $decima ){
                $iterMillon ++;
                $iterMil    ++;
                if($iterMil == 3 && $iterMillon != 6 ){
                    $decima = $decima.'.';
                    $iterMil= 0;
                }
                else if( $iterMillon == 6 ){
                    $decima = $decima."'";
                    $iterMillon= 0;
                }
                $result.= $decima;
            }
            $result = strrev($result);
            return $signoPeso.$result;
        }
    }

}

