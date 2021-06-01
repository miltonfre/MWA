angular.module("meanLaureates").controller("laureateGetOneController",laureateGetOneController);

function laureateGetOneController(laureateDataFactory,$routeParams,$location){
    let vm=this;
    const laureateId=$routeParams.id;
    laureateDataFactory.getOneLaureate(laureateId).then(function(response){
        vm.laureate=response;
    })
  

    vm.comeBack = function () {
        console.log("comeBack");
        $location.path("/laureates/");
    }

    
}