<?php

namespace App\Tests\Functional;

use App\Kernel;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\ArrayInput;

class ClientControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private Application $application;

    protected function setUp(): void
    {
        parent::setUp();
        $this->setupTest();
        $this->setupDatabase();
    }

    protected function setupTest()
    {
        if (static::$kernel === null) {
            static::$kernel = new Kernel('test', true);
            static::$kernel->boot();

            $this->application = new Application(static::$kernel);
            $this->application->setAutoExit(false);

            $this->client = static::createClient();
        }
    }

    protected function setupDatabase()
    {
        $this->application->run(new ArrayInput([
            'command' => 'doctrine:database:drop',
            '--if-exists' => '1',
            '--force' => '1',
            '--quiet' => '1'
        ]));

        $this->application->run(new ArrayInput([
            'command' => 'doctrine:database:create',
            '--quiet' => '1'
        ]));

        $this->application->run(new ArrayInput([
            'command' => 'doctrine:schema:create',
            '--quiet' => '1'
        ]));
    }

    public function testClientCreateAction()
    {
        $this->client->request('POST', '/api/client/create', [
            'clientId'    => 'd884f6b6-47f8-463c-a7ef-952936f7b84d',
            'email'       => 'test@example.com',
            'phoneNumber' => '0123456789',
            'name'        => 'Test',
            'comment'     => 'Test'
        ]);
        $response = $this->client->getResponse();
        $result = json_decode($response->getContent(), true);

        $this->assertArrayHasKey('status', $result);
    }

    public function testClientListAction()
    {
        $this->client->request('GET', '/api/client/list');
        $response = $this->client->getResponse();
        $result = json_decode($response->getContent(), true);

        $this->assertArrayHasKey('status', $result);
    }
}
