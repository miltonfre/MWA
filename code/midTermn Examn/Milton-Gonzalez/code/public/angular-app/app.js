angular.module("meanLaureates", ['ngRoute']).config(config);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/",{
        templateUrl:"angular-app/laureate-list/laureate-List.html",
        controller:"laureatesController",
        controllerAs:"vm"
    }).when("/laureates",{
        templateUrl:"angular-app/laureate-list/laureate-List.html",
        controller:"laureatesController",
        controllerAs:"vm"
    }).when("/laureates/:id",{
        templateUrl:"angular-app/laureate-one/laureate-One.html",
        controller:"laureateOneController",
        controllerAs:"vm"
    }).when("/laureates/details/:id",{
        templateUrl:"angular-app/laureate-get-one/laureate-get-one.html",
        controller:"laureateGetOneController",
        controllerAs:"vm"
    })
    .otherwise({
        templateUrl:"angular-app/laureate-list/laureate-List.html",
        controller:"laureatesController",
        controllerAs:"vm"
    });

}