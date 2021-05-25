angular.module("myProperApp").controller("mainController", mainController);

function mainController($http) {
    let vm = this;
    vm.name = 'main Controller';
    let count = vm.count;
    if (!count) {
        count = 10;
    }
    $http.get("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc").then(function (response) {
        console.log(response.data);
        vm.cats = response.data;
    });
   
    
}

function searchChange(){
    console.log("searchChange");
}
