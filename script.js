// Code goes here
angular.module('app', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {
    
    $stateProvider
        .state('user', {
            templateUrl: './user.html',
            url: '/:name', //params of the user
            controller: 'userCtrl'
        });

})
//controller for overall app
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
      $location.url('/' + people[0].name);
  } 

  $scope.clear = () => { //cleaing the search field when x is clicked
        $scope.user.name = '';
  }

})
//controller for contact details
.controller('userCtrl', function($scope, $stateParams){

    let person = $scope.people.filter((person) => { //using name to filter down to specific person to show in details
        return person.name === $stateParams.name;
    })

    starRating(person[0].rating)
    
    function starRating(rating){ //logic to set rating with stars
        let blankStar = '☆';
        let star = '★';
        let ratings = [];
        for(let i = 0; i < rating; i++){
            ratings.push({icon: star, id: i}); //making object so id can be used to avoid duplicates
        }
        let x = ratings.length
        while(x < 5){
            ratings.push({icon: blankStar, id: x});
            x++;
        }
        person[0].stars = ratings;
    }
    
    $scope.user = person[0]; //setting scope to the filtered user.
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
