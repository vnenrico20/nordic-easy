<?php

namespace App\Helper\Api;

use Symfony\Component\HttpFoundation\JsonResponse;

class Message extends JsonResponse
{
    public function __construct(?array $data = null, $message = null, $statusCode = self::HTTP_OK, $success = true)
    {
        $response['status']  = $success ? 'success' : 'error';

        if ($message != null) {
            $response['message'] = $message;
        }

        if ($data != null) {
            $response['data'] = $data;
        }

        parent::__construct($response, $statusCode);
    }
}
