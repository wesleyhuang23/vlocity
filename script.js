// Code goes here
angular.module('app', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('user', {
                templateUrl: './user.html',
                url: '/:name',
                controller: 'mainCtrl'
            });

        $urlRouterProvider.otherwise('/');

    })

.controller('mainCtrl', function($scope, mainSvc, $stateParams){
  let getPeople = () => {
      mainSvc.getPeople().then((res) => {
          console.log(res.data.People);
          $scope.people = res.data.People;
      })
  }

  getPeople();
})

.service('mainSvc', function($http){
    this.getPeople = () => {
        return $http({
            method: 'GET',
            url: './people.json'
        }).then((res) => {
            return res;
        })
    }
})
//service