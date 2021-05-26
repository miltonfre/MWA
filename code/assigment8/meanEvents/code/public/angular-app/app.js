angular.module("meanEvents", ['ngRoute']).config(config);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/",{
        templateUrl:"angular-app/event-list/events-List.html",
        controller:"eventsController",
        controllerAs:"vm"
    }).when("/events",{
        templateUrl:"angular-app/event-list/events-List.html",
        controller:"eventsController",
        controllerAs:"vm"
    }).when("/events/:id",{
        templateUrl:"angular-app/event-one/event-One.html",
        controller:"eventOneController",
        controllerAs:"vm"
    }).otherwise({
        templateUrl:"angular-app/event-list/events-List.html",
        controller:"eventsController",
        controllerAs:"vm"
    });

}