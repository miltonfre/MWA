angular.module("meanLaureates").controller("laureateOneController",laureateOneController);

function laureateOneController(laureateDataFactory,$routeParams,$location){
    let vm=this;
    const laureateId=$routeParams.id;
    vm.isSubmitted= false;
    vm.laureate='';
    laureateDataFactory.getOneLaureate(laureateId).then(function(response){
        vm.laureate=response;
        console.log(response);
    })

    vm.updateLaureate=function(){
        const newLaureate = {
            id:vm.laureate.id,
            firstname:vm.laureate.firstname,
            surname:vm.laureate.surname,
            born:vm.laureate.born ,
            died:vm.laureate.died,
            bornCountry: vm.laureate.bornCountry,
            bornCountryCode: vm.laureate.bornCountryCode,
            bornCity:vm.laureate.bornCity,
            diedCountry:vm.laureate.diedCountry,
            diedCountryCode:vm.laureate.diedCountryCode,
            diedCity: vm.laureate.diedCity,
            gender:vm.laureate.gender,
            year:  vm.laureate.year,
            category:  vm.laureate.category,
            motivation:vm.laureate.motivation,
            affiliation: vm.laureate.affiliation
        }
        if (vm.laureateForm.$valid) {
            laureateDataFactory.updateOneLaureate(vm.laureate._id,newLaureate).then(function (response) {
                $location.path("/laureates/");
            }).catch(function (er) {
                console.log(er);
            });
        }else{
            console.log("no valid");
            vm.isSubmitted= true;
        }
    }

    vm.reset = function () {
        $location.path("/laureates/");
    }

    
}