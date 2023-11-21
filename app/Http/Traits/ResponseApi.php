<?php


namespace App\Http\Traits;


use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Routing\Controller as BaseController;

class ResponseApi extends BaseController
{
    /**
     * @param bool $statusTransaction
     * @param array $message
     * @param array $data
     * @return JsonResponse
     */
    public static function response(bool $statusTransaction, array $message = [], array $data = []): JsonResponse
    {
        switch ((strtolower($message['type']))) {

            case 'success':
                $message['code'] = 200;
                break;
            case 'error':
                $message['code'] = 500;
                break;
            case 'warning':
                $message['code'] = 300;
                break;
            default:
                return abort(500);
                break;
        }
        return response()->json([
            'transaction' => [
                'status'  => $statusTransaction
            ],
            'data'        => $data,
            'message'     => $message
        ], $message['code']);
    }

    /**
     * @param array $array
     * @return JsonResponse
     */
    public function hasData(array $array): JsonResponse
    {
        return $this->response(true, [
            'type'    => 'success',
            'content' => 'Done.'
        ], $array);
    }

    /**
     * @param string $msg
     * @param int $code
     * @param string $tipe
     * @return void
     */
    public function notComplyDie(string $msg, int $code = 300, string  $type = 'warning')
    {
        header('Content-Type: application/json');
        header("HTTP/1.1 $code Permanent Redirect");
        die($this->response(false, [
                'type'    => $type,
                'content' => $msg
            ], [])->content());
    }

    /**
     * @return JsonResponse
     */
    public function notHasData(): JsonResponse
    {
        return $this->response(
            false,
            [
                'type'    => 'success',
                'content' => 'Not find data'
            ],
            []
        );
    }

    /**
     * @param $msg
     * @return JsonResponse
     */
    public static function error($msg): JsonResponse
    {
        return ResponseApi::response(
            false,
            [
                'type'    => 'error',
                'content' => $msg
            ],
            []
        );
    }

    /**
     * @param array $array
     * @return JsonResponse
     */
    public function validateCountAndResponse(array $array): JsonResponse
    {
        return count($array) > 0 ? $this->hasData($array) : $this->notHasData();
    }

    public function cacheResponse($key, $time=3599, $data = null)
    {
        $url = request()->url();
        $queryParams = request()->query();
        ksort($queryParams);
        $queryString = http_build_query($queryParams);
        $fullUrl = "{$url}?{$queryString}{$key}";
        return Cache::remember($fullUrl, $time, function () use ($data) {
            return $data;
        });
    }
}
