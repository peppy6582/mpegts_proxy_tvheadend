'use strict';

mpegTs.factory('findSourcesFactory', function($http) {
    var factory = {};
    factory.getSources = function() {
        return $http.get('/examples/get');

    };
    factory.insertSources = function(sources, sourceName, sourceProvider, sourceUrl, sourceSource) {
        //console.log(sources);
        sources.push({
            name: sourceName,
            provider: sourceProvider,
            url: sourceUrl,
            source: sourceSource
        });
    };
    factory.postSources = function(sources) {
        return $http.post('/examples/put', sources)
            .success(function(data) {
                return data;
            });
    };

    return factory;

});

