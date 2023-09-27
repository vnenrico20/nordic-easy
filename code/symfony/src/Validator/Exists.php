<?php

declare(strict_types=1);

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Exception\InvalidArgumentException;
use Symfony\Component\Validator\Exception\MissingOptionsException;

use function is_string;
use function sprintf;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class Exists extends Constraint
{
    public string $message = 'The value already exists.';

    public ?string $field;

    public function __construct(?string $field, mixed $options = null, ?array $groups = null, mixed $payload = null)
    {
        parent::__construct($options, $groups, $payload);

        $this->field = $field ?? null;

        if ($this->field === null) {
            throw new MissingOptionsException(
                sprintf(
                    'The "field" must be given for constraint "%s".',
                    self::class,
                ),
                ['field'],
            );
        }
    }
}
