angular.module("meanGames", ['ngRoute']).config(config);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/",{
        templateUrl:"angular-app/game-list/games-List.html",
        controller:"gamesController",
        controllerAs:"vm"
    }).when("/games",{
        templateUrl:"angular-app/game-list/games-List.html",
        controller:"gamesController",
        controllerAs:"vm"
    }).when("/games/:id",{
        templateUrl:"angular-app/game-one/game-One.html",
        controller:"gameOneController",
        controllerAs:"vm"
    }).otherwise({
        templateUrl:"angular-app/game-list/games-List.html",
        controller:"gamesController",
        controllerAs:"vm"
    });

}