angular.module("meanEvents").controller("RegisterController", RegisterController);


function RegisterController($http) {
    var vm = this;


    vm.register = function () {
        var user = { username: vm.username, pasword: vm.password };
        console.log(vm.username,vm.password,vm.passwordRepeate);
        if (!vm.username || !vm.password) {
            vm.err = "Please add a username and password.";
        }
        else {
            if (vm.password !== vm.passwordRepeat) {
                vm.err = "Please make sure the passwords match.";
            } else {
                $http.post("/api/users", user).then(function (result) {
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    vm.err = "";
                }).catch(function (err) { console.log(err); });
            }
        }
    }
}