<?php

declare(strict_types=1);

namespace App\Validator;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

use function is_object;
use function is_string;
use function str_replace;

class ExistsValidator extends ConstraintValidator
{
    public function __construct(
        private readonly EntityManagerInterface $em,
    ) {
    }

    public function validate(mixed $value, Constraint $constraint): void
    {
        if (! $constraint instanceof Exists) {
            throw new UnexpectedTypeException($constraint, Exists::class);
        }

        if ($value === null || $value === '') {
            return;
        }

        $object = $this->context->getObject();
        if (! is_object($object)) {
            throw new UnexpectedValueException($object, 'object');
        }

        $repository = $this->em->getRepository($object::class);
        $data       = $repository->findOneBy([$constraint->field => $value]);

        if (! is_object($data)) {
            return;
        }

        $classMetadata = $this->em->getClassMetadata($object::class);
        if ($classMetadata->getIdentifierValues($data) === $classMetadata->getIdentifierValues($object)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
                      ->setParameter('{{ value }}', $this->formatValue($value))
                      ->addViolation();
    }
}
