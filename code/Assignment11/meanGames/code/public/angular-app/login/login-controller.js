angular.module("meanGames").controller("LoginController", LoginController);
function LoginController($http, $location, $window, AuthFactory, jwtHelper) {

    var vm = this;
    vm.isLoggedIn = function () {
        if ($window.sessionStorage.isLoggedIn) { return true }
        else { return false; }
    };
    vm.login = function () {
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };
            $http.post("/api/auth", user).then(function (response) {
                if (response.data.success) {
                    vm.username = '';
                    vm.password = '';
                    $window.sessionStorage.token = response.data.token;
                    $window.sessionStorage.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.name;
                }
            }).catch(function (er) {
                console.log(er);
            });
        }
    }
    vm.logout = function () {
        console.log('logout');
        delete $window.sessionStorage.isLoggedIn;
        delete $window.sessionStorage.token;
        $location.path("/");
    }
    vm.isActiveTab = function (url) {
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
}