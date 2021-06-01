angular.module("meanLaureates").controller("laureatesController", laureatesController);

function laureatesController(laureateDataFactory,$location) {
    let vm = this;
    vm.visibleNewLaureateForm = false;
    vm.offset = 0;
    vm.count = 5;
    vm.title = "MEAN Prizes app";
    vm.objSkill = '';
    vm.isSubmitted= false;

    
    laureateDataFactory.getAllLaureates(vm.offset, vm.count).then(function (response) {
        vm.laureates = response;
    });

    vm.findLaureates = function () {
        vm.visibleNewLaureateForm = false;
        if(vm.searchText){
            laureateDataFactory.getLaureatesByCountryBirth(vm.offset, vm.count,vm.searchText).then(function (response) {
                console.log(response);
                vm.laureates = response;
            });
        }
        else{
            laureateDataFactory.getAllLaureates(vm.offset, vm.count).then(function (response) {
                console.log(response);
                vm.laureates = response;
            });
        }
    }
    vm.showNewLaureate = function () {
        vm.visibleNewLaureateForm = true;
    }

    vm.reset = function () {
        vm.visibleNewLaureateForm = false;
        vm.newLaureateFirstName = '';
        vm.newLaureateSurName = '';
        vm.newLaureateBorn = '';
        vm.newLaureateDied = '';
        vm.newLaureatBornCountry = '';
        vm.newLaureatBornCountryCode= '';
        vm.newLaureatBornCity= '';
        vm.newLaureatDiedCountry= '';
        vm.newLaureatDiedCountryCode= '';
        vm.newLaureatDiedCity= '';
        vm.newLaureatGender= '';
        vm.newLaureatYear= '';
        vm.newLaureatCategory= '';
        vm.newLaureatMotivation= '';
        vm.newLaureatAffiliation= '';
    }

    vm.searchLaureates=function(){
        vm.findLaureates()
    }
    vm.addLaureate = function () {
        const newLaureate = {
            id:vm.newLaureateInteranlId,
            firstname:vm.newLaureateFirstName,
            surname:vm.newLaureateSurName,
            born:vm.newLaureateBorn ,
            died:vm.newLaureateDied,
            bornCountry: vm.newLaureateBornCountry,
            bornCountryCode: vm.newLaureateBornCountryCode,
            bornCity:vm.newLaureateBornCity,
            diedCountry:vm.newLaureateDiedCountry,
            diedCountryCode:vm.newLaureateDiedCountryCode,
            diedCity: vm.newLaureateDiedCity,
            gender:vm.newLaureateGender,
            year:  vm.newLaureateYear,
            category:  vm.newLaureateCategory,
            motivation:vm.newLaureateMotivation,
            affiliation: vm.newLaureateAffiliation
        }
        console.log(newLaureate);
        if (vm.laureateForm.$valid) {
            laureateDataFactory.addOneLaureate(newLaureate).then(function (response) {
                console.log("laureate created", response);
                vm.findLaureates();
            }).catch(function (er) {
                console.log(er);
            });
        }else{
            vm.isSubmitted= true;
        }
    }

    vm.detailsOneLaureate=function(laureateId){
        $location.path("/laureates/details/"+laureateId);
    }
    vm.deleteOneLaureate=function(laureateId){
        if(confirm("Are you sure to delete")) {
            laureateDataFactory.deleteOneLaureate(laureateId).then(function (response) {
                console.log("laureate deleted",response);
                vm.findLaureates();
            }).catch(function(er){
                console.log(er);
            });
        }
    }

    vm.editOneLaureate=function(laureateId){
        $location.path("/laureates/"+laureateId);
    }

    vm.nextPage = function () {
        vm.offset = vm.offset + 1;
        vm.findLaureates();
    }
    vm.beforePage = function () {
        vm.offset = vm.offset - 1;
        vm.findLaureates();
    }
}