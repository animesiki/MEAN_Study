
/**
 * Created by williamjiang on 2015/4/22.
 */

// Declare app level module which depends on views, and components
var reportApp = angular.module('webPortalApp', [
    'ngRoute',
    'webPortalApp.mainController',
    'webPortalApp.dataSourceController',
    'webPortalApp.services',
    'webPortalApp.filters',
    'webPortalApp.directives'
]);

reportApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'home'
        })
        .when('/DataSourceMgn', {
            templateUrl: 'ds_manage.html',
            controller: 'dataSourceMng'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

