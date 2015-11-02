/**
 * Created by JIANGWI on 4/27/2015.
 */
var directive = angular.module('webPortalApp.directives', []);

directive.directive('file', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        link: function ($scope, el, attrs, ngModel) {
            el.bind('change', function (event) {
                var files = event.target.files;
                var file = files[0];

                ngModel.$setViewValue(file);
                $scope.$apply();
            });
        }
    };
});