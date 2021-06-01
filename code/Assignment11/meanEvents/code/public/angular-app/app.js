angular.module("meanEvents", ['ngRoute', "angular-jwt"]).config(config).run(run);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/",{
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).when("/events",{
        templateUrl:"angular-app/event-list/events-List.html",
        controller:"eventsController",
        controllerAs:"vm"
    }).when("/events/:id",{
        templateUrl:"angular-app/event-one/event-One.html",
        controller:"eventOneController",
        controllerAs:"vm"
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        controllerAs: "vm",
        access: { restricted: true }
    }).otherwise({
        templateUrl:"angular-app/event-list/events-List.html",
        controller:"eventsController",
        controllerAs:"vm"
    });

}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
        }
    });
}