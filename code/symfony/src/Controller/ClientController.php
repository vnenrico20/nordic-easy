<?php

namespace App\Controller;

use App\Entity\Client;
use App\Helper\Api\ErrorMessage;
use App\Helper\Api\Message;
use App\Service\ClientService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\UuidV4;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ClientController extends AbstractController
{
    public function __construct(
        public ValidatorInterface $validator,
        public ClientService $clientService
    ) {
    }

    #[Route('/api/client/create', name: 'api_client_create', methods: ['POST'])]
    #[Route('/api/client/update', name: 'api_client_update', methods: ['PUT'])]
    public function createAction(Request $request): Message
    {
        $input = [
            'clientId'    => $request->get('client_id'),
            'email'       => $request->get('email'),
            'phoneNumber' => $request->get('phone_number'),
            'name'        => $request->get('name'),
            'comment'     => $request->get('comment'),
        ];

        try {
            $clientId = new UuidV4($input['clientId']);
        } catch (Exception $exception) {
            return new ErrorMessage($exception->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($request->getMethod() === Request::METHOD_PUT) {
            $client = $this->clientService->findOneBy(['clientId' => $clientId]);

            if ( ! $client instanceof Client) {
                return new ErrorMessage('Invalid Client', Response::HTTP_NOT_FOUND);
            }
        } else {
            $client = new Client();
            $client->setClientId($clientId);
        }

        $client->setEmail($input['email']);
        $client->setPhoneNumber($input['phoneNumber']);
        $client->setName($input['name']);
        $client->setComment($input['comment']);

        $errors = $this->validator->validate($client);
        if (count($errors) > 0) {
            $error = $errors->get(0);
            $errorsString = sprintf('Param %s: %s', $error->getPropertyPath(), $error->getMessage());

            return new ErrorMessage($errorsString, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->clientService->save($client, true);

        return new Message([
            'client' => $client
        ]);
    }

    #[Route('/api/client/delete', name: 'api_client_delete', methods: ['DELETE'])]
    public function deleteAction(Request $request): Message
    {
        try {
            $clientId = new UuidV4($request->get('client_id'));
        } catch (Exception $exception) {
            return new ErrorMessage($exception->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $client = $this->clientService->findOneBy(['clientId' => $clientId]);

        if ( ! $client instanceof Client) {
            return new ErrorMessage('Invalid Client', Response::HTTP_NOT_FOUND);
        }

        $this->clientService->remove($client, true);

        return new Message([
            'client' => $client
        ]);
    }

    #[Route('/api/client/list', name: 'api_client_list', methods: ['GET'])]
    public function listAction(): Message
    {
        $clients = $this->clientService->findAll();

        return new Message($clients);
    }
}
