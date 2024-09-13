<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

class MqttServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(MqttClient::class, function ($app) {
            $config = $app['config']['mqtt.broker'];

            // Inisialisasi ConnectionSettings
            $settings = (new ConnectionSettings)
                ->setUsername($config['username'])
                ->setPassword($config['password']);

            // Mengembalikan instance MqttClient
            return new MqttClient($config['host'], $config['port'], $config['client_id'], $settings);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
