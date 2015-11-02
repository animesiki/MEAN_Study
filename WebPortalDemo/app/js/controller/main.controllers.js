/**
 * Created by JIANGWI on 4/27/2015.
 */
var contrl = angular.module('webPortalApp.mainController', [
    'ngRoute',
    'ngCookies',
    'chart.js'
]);

contrl.controller('Login', function ($cookieStore, $scope, $http, $location) {
    $scope.msg = "Hello";
    $scope.click = function () {
        var reqUser = {
            name: $scope.user.userName,
            password: $scope.user.password
        };
        $http.post('/loginCheck', reqUser).success(function (data) {
            if (data.err) {
                return $scope.err = data.err;
            }
            console.log("data" + data);
            if (data) {
                sessionName = data.name;
                $cookieStore.put('user', data.name);
                window.location = '/index';

            }
        });
    };
});



contrl.controller('index', function ($cookieStore, $scope, $http) {
    $scope.userName = $cookieStore.get('user');
    $scope.logOut = function () {
        $http.get('/logOut').success(function (data) {
            if (data) {
                alert(data);
                window.location = '/index';
            }
        })
    };
});

contrl.controller('home', function ($scope, $location, $http) {
    $scope.showHome = function () {
        $location.path('/home');
    };
    $http.get('/getAppCount').success(function (response) {
        $scope.appCount = response.count;
    });
    $http.get('/getDataSourceCount').success(function (response) {
        $scope.dsCount = response.count;
    });

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

});


