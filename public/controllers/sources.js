'use strict';

mpegTs.controller('sourceAppController', function ($scope, $log, $mdSidenav, $state, $filter, $http, ngDialog, findSourcesFactory) {

    $scope.toggleLeft = function() {
        $scope.slide = { 'left': '300px', 'width': '70%' };
        $mdSidenav('left').toggle();
    };

    $scope.closeLeft = function() {
        $mdSidenav('left').close()
        .then(function(){
                $scope.slide= { 'width': 'auto' };
                $state.go($state.current, {}, {reload: true});
        });

    };

    $scope.editable = 'Off';

    $scope.slide= { 'width': 'auto' };

    $scope.open = function (sourceName) {
        alert("Source Name is " + sourceName);
        $scope.editFilter = sourceName;
        ngDialog.open({
            template: 'firstDialog',
            scope: $scope
        });
    };


    findSourcesFactory.getSources().then(function(data){
        $scope.sources = data.data;
    });

    $scope.addSources = function() {
        var sources = $scope.sources;
        var sourceName = $scope.newSource.name;
        var sourceProvider = $scope.newSource.provider;
        var sourceUrl = $scope.newSource.url;
        var sourceSource = $scope.newSource.source;
        findSourcesFactory.insertSources(sources, sourceName, sourceProvider, sourceUrl, sourceSource);
        findSourcesFactory.postSources($scope.sources);
        $scope.newSource.name = '';
        $scope.newSource.provider = '';
        $scope.newSource.url = '';
        $scope.newSource.source = '';
    };



});