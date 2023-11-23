<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//de esta forma SOLO nos genera las rutas de los metodos que estan en el only
//Route::resource('blog',App\Http\Controllers\BlogController::class)->only(['index','store','show','update','destroy']);

//de esta forma nos genera todas las rutas

Route::prefix('v1')->group(function(){
    Route::get('auth/login',[AuthController::class, 'login']);
    Route::post('auth/register',[AuthController::class, 'register']);
});




Route::post('/medic/all', [\App\Http\Controllers\MedicController::class, '__invoke']);
Route::post('/medic/save_log', [\App\Http\Controllers\MedicController::class, 'saveLog']);

Route::post('/medic/search', [\App\Http\Controllers\MedicController::class, 'search']);



Route::middleware([/*'auth:api'*/  'auth:api'])->group(function () {
    Route::post('/general/progress_bar', [\App\Http\Controllers\MedicController::class, 'getProgressBar']);
});


// finansas
Route::post('finance/getInvestments', [\App\Http\Controllers\FinanceController::class, 'getInvestments']);

Route::post('/test', [\App\Http\Controllers\testController::class, 'methodOne']);

// getProgressBar


Route::resource('blog',App\Http\Controllers\BlogController::class);
