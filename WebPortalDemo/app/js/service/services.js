/**
 * Created by JIANGWI on 4/27/2015.
 */
var service = angular.module('webPortalApp.services', []);

service.factory('commonService', function ($http) {
    var getAllApps = function ($scope) {
        $http.get('/getAllApps').success(function (response) {
            $scope.apps = response;
        });
    };

    return {
        getApps: function ($scope) {
            return getAllApps($scope);
        }
    };
});