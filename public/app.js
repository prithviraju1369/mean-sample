var app = angular.module('myApp', ['ngRoute','ngCookies']);

app.config(['$routeProvider',
  function($routeProvider) {
      
    $routeProvider.
      when('/account', {
        templateUrl: 'partials/account.html',
        controller: 'account'
      }).
      when('/registration', {
        templateUrl: 'partials/registration.html',
        controller: 'registration'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'login'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
      }).
      otherwise({
        redirectTo: '/account'
      });
      
      
  }]);

app.controller('account',['$scope','UserService','$location','$window','$cookies',function($scope, UserService,$location,$window,$cookies) {
    if($cookies.getObject('objSocket'))
    {
        $scope.user=$cookies.getObject('objSocket');
    }else{
        $location.path('/login')
    }
    $scope.logout=function(){
        $cookies.remove("objSocket");
        $scope.user={};
        $location.path('/login')
    }
}]);

  
app.controller('login',['$scope','UserService','$location','$window','$cookies',function($scope, UserService,$location,$window,$cookies) {
    if($cookies.getObject('objSocket')){
        $location.path('/account');
    }
    $scope.login=function(){
        UserService.Login({username:$scope.username,password:$scope.password}).then(function (user) {
                    if(user && user.length>0){
                         $cookies.putObject('objSocket',user[0]);
                         $location.path('/account');
                    }else{
                        //login failed
                    }
                });
    }  
}]);

app.controller('registration',['$scope','UserService','$location','$window','$cookies',function($scope, UserService,$location,$window,$cookies) {
    if($cookies.getObject('objSocket')){
        $location.path('/account');
    }
    $scope.register=function(){
        UserService.Create({uname:$scope.uname,password:$scope.pword,fname:$scope.firstname,lname:$scope.lastname}).then(function (user) {
            if(user==true){
                $scope.loginSucess=true;
                $location.path('/login');
            }else{
                $scope.loginSucess=false;
            }
                });
    }  
}]);
