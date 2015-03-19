'use strict';

mpegTs.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/sources');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('sources', {
            url: '/sources',
            templateUrl: '/views/partial/sources.html'
        })

        .state('sources-edit', {
            url: '/edit',
            templateUrl: '/views/partial/sources-edit.html'
        })

        .state('sources-add', {
            url: '/add',
            templateUrl: '/views/partial/sources-add.html'
        })

});

