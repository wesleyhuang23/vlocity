// Code goes here
angular.module('app', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {
    
    $stateProvider
        .state('user', {
            templateUrl: './user.html',
            url: '/:name',
            controller: 'userCtrl'
        });

})

.controller('mainCtrl', function($scope, mainSvc, $location){
    
  let getPeople = () => {
      mainSvc.getPeople().then((res) => {
          console.log(res.data.People);
          $scope.people = res.data.People;
          $scope.setContact($scope.people);
      })
  }
  getPeople(); //initial data request

  $scope.setContact = function(people){ //seting the first person in the route
      console.log($scope.people);
      $location.url('/' + people[0].name);
  } 

  $scope.clear = () => { //cleaing the search field when x is clicked
        $scope.user.name = '';
  }

})
.controller('userCtrl', function($scope, $stateParams){

    let person = $scope.people.filter((person) => {
        return person.name === $stateParams.name;
    })
    
    function starRating(rating){
        let blankStar = '☆';
        let star = '★';
        let ratings = [];
        for(let i = 0; i < rating; i++){
            ratings.push({icon: star, id: i});
        }
        let x = ratings.length
        while(x < 5){
            ratings.push({icon: blankStar, id: x});
            x++;
        }
        
        person[0].stars = ratings;
    }
    starRating(person[0].rating)
    $scope.user = person[0];
})
//service
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
