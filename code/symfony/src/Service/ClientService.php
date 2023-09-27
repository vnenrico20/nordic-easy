<?php

namespace App\Service;

use App\Entity\Client;
use App\Repository\ClientRepository;

class ClientService
{
    public function __construct(
        public ClientRepository $clientRepository
    ) {
    }

    public function save(Client $entity, bool $flush = false): void
    {
        $this->clientRepository->save($entity, $flush);
    }

    public function remove(Client $entity, bool $flush = false): void
    {
        $this->clientRepository->remove($entity, $flush);
    }

    public function findAll(): array
    {
        return $this->clientRepository->findBy(['deletedAt' => null], ['createdAt' => 'DESC']);
    }

    public function findOneBy(array $criteria, array $orderBy = null): ?Client
    {
        return $this->clientRepository->findOneBy($criteria, $orderBy);
    }

}
