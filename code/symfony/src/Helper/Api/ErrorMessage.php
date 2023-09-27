<?php

namespace App\Helper\Api;

class ErrorMessage extends Message
{
    public function __construct($message, $statusCode)
    {
        parent::__construct(null, $message, $statusCode, false);
    }
}
