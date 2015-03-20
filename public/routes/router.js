'use strict';

mpegTs.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/sources');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('sources', {
            url: '/sources',
            templateUrl: '/views/partial/sources.html'
        })

        .state('sources.edit', {
            url: '/sources-edit',
            controller: 'sourceAppController',
            templateUrl: 'firstDialog'
        })

        .state('sources-edit', {
            url: '/edit',
            controller: 'sourceAppController',
            templateUrl: '/views/partial/edit.html'
        })

        .state('sources-add', {
            url: '/add',
            templateUrl: '/views/partial/sources-add.html'
        })

});

