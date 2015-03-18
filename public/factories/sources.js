'use strict';

mpegTs.factory('findSourcesFactory', function($http) {
    var factory = {};
    factory.getSources = function() {
        return $http.get('/examples/get');
    };
    factory.insertSources = function(sources,sourceName, sourceProvider, sourceUrl, sourceSource) {
        sources.push({
            name: sourceName,
            provider: sourceProvider,
            url: sourceUrl,
            source: sourceSource
        });
        console.log(sources);
        request({
            url: '/examples/put',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(sources)
        });
      };

    return factory;
});