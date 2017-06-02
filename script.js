// Code goes here
angular.module('app', ['ui-router']).config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('user', {
                templateUrl: './user.html',
                url: '/',
                controller: 'mainCtrl'
            });

        $urlRouterProvider.otherwise('/');

    })

.controller('mainCtrl', function($scope, mainSvc){
  $scope.test = 'hello world';
})
//service