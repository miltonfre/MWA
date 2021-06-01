angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);
function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).when("/games", {
        templateUrl: "angular-app/game-list/games-List.html",
        controller: "gamesController",
        controllerAs: "vm"
    }).when("/games/:id", {
        templateUrl: "angular-app/game-one/game-One.html",
        controller: "gameOneController",
        controllerAs: "vm"
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        controllerAs: "vm",
        access: { restricted: true }
    }).otherwise({
        templateUrl: "angular-app/game-list/games-List.html",
        controller: "gamesController",
        controllerAs: "vm"
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