// Code goes here
angular.module('app', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('user', {
                templateUrl: './user.html',
                url: '/:name',
                controller: 'userCtrl'
            });

        $urlRouterProvider.otherwise('/');

    })

.controller('mainCtrl', function($scope, mainSvc){
  let getPeople = () => {
      mainSvc.getPeople().then((res) => {
          console.log(res.data.People);
          $scope.people = res.data.People;
      })
  }

  getPeople();
})
.controller('userCtrl', function($scope, $stateParams){
    console.log($stateParams.name);
    let person = $scope.people.filter((person) => {
        return person.name === $stateParams.name;
    })
    console.log(person);
    $scope.user = person[0];
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