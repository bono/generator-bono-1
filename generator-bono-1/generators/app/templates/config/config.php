<?php

/**
 * Bono App Configuration
 *
 * @category  PHP_Framework
 * @package   Bono
 * @author    Ganesha <reekoheek@gmail.com>
 * @copyright 2016 PT Sagara Xinix Solusitama
 * @license   https://raw.github.com/xinix-technology/bono/master/LICENSE MIT
 * @version   0.10.0
 * @link      http://xinix.co.id/products/bono
 */

use Norm\Schema\String;
use Norm\Schema\Password;

return array(
    'bono.timezone' => 'Asia/Jakarta',
    'bono.prettifyURL' => true,
    'bono.salt' => 'please change this',
    'bono.providers' => array(
        'Norm\\Provider\\NormProvider' => array(
            'datasources' => array(
                'filedb' => array(
                    'driver' => 'ROH\\FDB\\Connection',
                    'dataDir' => '../data',
                ),
                // to use mongo
                // 'mongo' => array(
                //     'driver' => 'Norm\\Connection\\MongoConnection',
                //     'database' => 'myapp',
                // ),
                // 'mysql' => array(
                //     'driver' => 'Norm\\Connection\\PDOConnection',
                //     'prefix' => 'mysql',
                //     'dbname' => 'myapp',
                //     'username' => 'root',
                //     'password' => '',
                // )
            ),
            'collections' => array(
                'default' => array(
                    // The observer, more like a hook event
                    'observers' => array(
                        'Norm\\Observer\\Ownership',
                        'Norm\\Observer\\Timestampable',
                    ),

                    // Limit the entries that shown, then paginate them
                    'limit' => 20,
                ),

                // Resolver to find where the schemas config stored see in /config/collections folder
                'resolvers' => array(
                    'Norm\\Resolver\\CollectionResolver',
                ),
            ),
        ),
        'Bono\\Provider\\LanguageProvider' => null,
        'App\\Provider\\AppProvider',
    ),
    'bono.middlewares' => array(
        'Bono\\Middleware\\StaticPageMiddleware' => null,
        'Bono\\Middleware\\ControllerMiddleware' => array(
            'default' => 'Norm\\Controller\\NormController',
            'mapping' => array(
                '/user' => null,
            ),
        ),
        // uncomment below to enable auth
        'Xinix\\BonoAuth\\Middleware\\AuthMiddleware' => array(
            'driver' => 'Xinix\\BonoAuth\\Driver\\NormAuth',
        ),
        'Bono\\Middleware\\NotificationMiddleware' => null,
        'Bono\\Middleware\\SessionMiddleware' => null,
        'Bono\\Middleware\\ContentNegotiatorMiddleware' => array(
            'extensions' => array(
                'json' => 'application/json',
            ),
            'views' => array(
                'application/json' => 'Bono\\View\\JsonView',
            ),
        ),
    ),
);
