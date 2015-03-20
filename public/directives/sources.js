'use strict';

mpegTs.directive('ngLike', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            elem.on('click', function () {
                window.open(attr.href, 'Share', 'width=600,height=400,resizable=yes');
            });
        }
    };
});