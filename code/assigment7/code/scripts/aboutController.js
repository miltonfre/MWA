angular.module("myProperApp").controller("aboutController",aboutController);

function aboutController(){
    let vm=this;
    vm.name="This is my bio";
}