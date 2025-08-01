<?php

namespace App\Http\Controllers;

use App\Http\Traits\Sp;
use Illuminate\Http\Request;
use App\Models\InvestmentPayment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

    public function savePago(Request $request){
        $validated = $request->validate([
            'investment_id' => 'required|exists:investments,id',
            'value' => 'required|numeric|min:0.01'
        ]);
        $payment = new InvestmentPayment();
        $payment->investment_id   = $request->investment_id;
        $payment->current_profit  = $request->value;
        $payment->status          = 1;
        $payment->created_at      = Carbon::now();
        $payment->save();
        return $this->responseApi->response(true, [
            'type' => 'success',
            'content' => 'Pago registrado correctamente.'
        ], []);
    }

    public function getPagosByInvestment(Request $request)
    {
        $validated = $request->validate([
            'investment_id' => 'required|exists:investments,id'
        ]);

        // Obtener los pagos asociados
        /*
        $pagos = InvestmentPayment::where('investment_id', $request->investment_id)
            ->orderByDesc('created_at')
            ->get([
                'id',
                'current_profit as value',
                'status',
                'created_at'
            ]);
          */
            $pagos = DB::table('investment_payments')
            ->join('investments', 'investment_payments.investment_id', '=', 'investments.id')
            ->join('investments_types', 'investments.investment_type_id', '=', 'investments_types.id')
            ->where('investment_payments.investment_id', $request->investment_id)
            ->orderByDesc('investment_payments.created_at')
            ->get([
                'investment_payments.id',
                'investment_payments.current_profit as value',
                'investment_payments.status',
                'investments.entity',
                'investment_payments.created_at',
                'investments.name as investment_name',
                'investments_types.name as type_name',

            ]);  

            foreach ($pagos as $key => $item) {
                if($key == 0){
                    $investment['name']      = $item->investment_name;
                    $investment['type_name'] = $item->type_name; 
                    $investment['entity']    = $item->entity;
                    break;
                }
                
            }
            
            $data = [
                'pagos' => $pagos->toArray(),
                'investment' =>$investment
            ];

            
       

        // Devolver respuesta estructurada
        return $this->responseApi->response(true, [
            'type'    => 'success',
            'content' => 'Pagos obtenidos correctamente.'
        ], $data);
    }



    public function formato_pesos_colombianos($numero, $signoPeso = '$ ') {
    // Limpiar entrada
    $numero = preg_replace('/[^\d]/', '', $numero);
    $numero = (string) $numero;

    // Revertimos el número para agrupar fácilmente desde el final
    $reversed = strrev($numero);
    $chunks = str_split($reversed, 3);

    // Formateamos con punto y apóstrofe
    $formatted = '';
    foreach ($chunks as $index => $chunk) {
        if ($index == 0) {
            $formatted .= $chunk;
        } elseif ($index == 1) {
            $formatted .= '.' . $chunk;
        } else {
            $formatted .= "'" . $chunk;
        }
    }

    // Invertimos de nuevo y retornamos
    return $signoPeso . strrev($formatted);
    }

}

