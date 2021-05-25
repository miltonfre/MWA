angular.module("myProperApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/main.html",
        controller:"mainController",
        controllerAs:"mainCtrl"
    }).when("/about", {
        templateUrl: "templates/about.html",
        controller:"aboutController",
        controllerAs:"aboutCtrl"
    }).otherwise({
        redirect: '/'
    });
}
