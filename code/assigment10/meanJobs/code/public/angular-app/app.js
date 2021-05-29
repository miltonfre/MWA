angular.module("meanJobs", ['ngRoute']).config(config);
function config($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/",{
        templateUrl:"angular-app/job-list/jobs-List.html",
        controller:"jobsController",
        controllerAs:"vm"
    }).when("/jobs",{
        templateUrl:"angular-app/job-list/jobs-List.html",
        controller:"jobsController",
        controllerAs:"vm"
    }).when("/jobs/:id",{
        templateUrl:"angular-app/job-one/job-One.html",
        controller:"jobOneController",
        controllerAs:"vm"
    }).otherwise({
        templateUrl:"angular-app/job-list/jobs-List.html",
        controller:"jobsController",
        controllerAs:"vm"
    });

}