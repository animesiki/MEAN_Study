var contrl=angular.module('meanApp.controller',['ngRoute']);

contrl.controller('SayHello',function($scope) {
  $scope.username = 'World';
  $scope.sayHello = function() {
    $scope.greeting= 'Hello ' + $scope.username + '!';
  };
  $scope.colors=['read','green','white','gray'];
});

contrl.controller('Login',function($scope,$http,$location){
$scope.hello='Hello';
$scope.user={
		userName:'',
		password:''
};
$scope.register=function(){
var req={ident:"signup"};
$http.post('/href',req).success(function(response){
window.location = response.redirect;
});
};
  $scope.click=function(){
    alert("clicked");
	var reqUser={
	name:$scope.user.userName,
	password:$scope.user.password
	};
	alert("name:"+reqUser.name+" password:"+reqUser.password);
	
  	$http.post('/loginCheck',reqUser).success(function(data){
  	if (data.err) {
          return $scope.err = data.err;
        }
  	$scope.name=data.name;
	window.location = data.redirect;
  });
  };
});

contrl.controller('SignUp',function($scope,$http,$location){
$scope.welcome='Welcome';
$scope.user={
		userName:'',
		password:'',
		email:''
};
$scope.check=function(){
 var name=$scope.user.userName;
 var user={
 name:name};
 $http.post('/nameCheck',user).success(function(data){
  	if (data.err) {
          return $scope.err = data.err;
        }
  	$scope.hint=data.hint;
  });
};
$scope.login=function(){
var req={ident:"login"};
$http.post('/href',req).success(function(response){
window.location = response.redirect;
});
};

  $scope.click=function(){
    alert("clicked");
	if($scope.hint=="name exist"){
	alert("name exist");
	return;
	}
	var reqUser={
	name:$scope.user.userName,
	password:$scope.user.password,
	email:$scope.user.email
	};
	alert("name:"+reqUser.name+" password:"+reqUser.password+" email:"+reqUser.email);
	
  	$http.post('/SignUp',reqUser).success(function(data){
  	if (data.err) {
          return $scope.err = data.err;
        }
  	$scope.name=data.name;
	alert(data.hint);
	window.location=data.redirect;
  });
  };

  
});

contrl.controller('showUser',function($scope,$http){
   $scope.show=function(){
    alert("hello");
   $http.get('/allUser').success( function(response) {
	   $scope.users = response;
       });
   };

});

