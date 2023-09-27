<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230925034311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $table_client = $schema->createTable('client');
        $table_client->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table_client->addColumn('client_id', Types::BINARY, ['length' => 16]);
        $table_client->addColumn('email', Types::STRING, ['length' => 255]);
        $table_client->addColumn('phone_number', Types::STRING, ['length' => 20, 'notnull' => false]);
        $table_client->addColumn('name', Types::STRING, ['length' => 255]);
        $table_client->addColumn('comment', Types::STRING, ['length' => 1000]);
        $table_client->addColumn('created_at', Types::DATETIME_IMMUTABLE, ['precision' => 0]);
        $table_client->addColumn('updated_at', Types::DATETIME_IMMUTABLE, ['precision' => 0, 'default' => null, 'notnull' => false]);
        $table_client->addColumn('deleted_at', Types::DATETIME_IMMUTABLE, ['precision' => 0, 'default' => null, 'notnull' => false]);
        $table_client->setPrimaryKey(['id']);

        $table_client->addUniqueIndex(['client_id'], 'client_unique_client_id');
        $table_client->getColumn('client_id')->setComment('(DC2Type:uuid)');
        $table_client->getColumn('created_at')->setComment('(DC2Type:datetime_immutable)');
        $table_client->getColumn('updated_at')->setComment('(DC2Type:datetime_immutable)');
        $table_client->getColumn('deleted_at')->setComment('(DC2Type:datetime_immutable)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $schema->dropTable('client');
    }
}
