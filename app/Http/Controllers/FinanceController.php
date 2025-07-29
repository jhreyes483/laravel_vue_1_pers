<?php

namespace App\Http\Controllers;

use App\Http\Traits\Sp;
use Illuminate\Http\Request;
use App\Models\InvestmentPayment;
use Carbon\Carbon;

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

