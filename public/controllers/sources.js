'use strict';

mpegTs.controller('sourceAppController', function ($scope, findSourcesFactory) {

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
        $scope.newSource.name = ' ';
        $scope.newSource.provider = ' ';
        $scope.newSource.url = ' ';
        $scope.newSource.source = ' ';
    };

});